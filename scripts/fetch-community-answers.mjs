import { writeFile } from 'node:fs/promises';
import { toDiscussion, isCommunityAnswer, issueContribution } from './community-answers.mjs';
import questionDiscussionNumbers from '../src/data/question-discussions.json' with { type: 'json' };

const token = process.env.GITHUB_TOKEN;
if (!token) { console.log('No GITHUB_TOKEN: keeping local community snapshot.'); process.exit(0); }
const repository = process.env.GITHUB_REPOSITORY || 'Praymo/qtia-open-quant-handbook';
if (!/^[\w.-]+\/[\w.-]+$/.test(repository)) throw new Error('Invalid GITHUB_REPOSITORY');
const headers = { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' };
async function github(path) {
  const response = await fetch(`https://api.github.com/repos/${repository}${path}`, { headers });
  if (!response.ok) throw new Error(`GitHub ${path}: HTTP ${response.status}`);
  return response.json();
}
const discussions = [];
const issueContributions = [];
for (let page = 1; page <= 20; page++) {
  const issues = await github(`/issues?state=all&per_page=100&page=${page}`);
  issueContributions.push(...issues.map(issueContribution).filter(Boolean));
  for (const issue of issues.filter(item => !item.pull_request && isCommunityAnswer(item))) {
    const comments = [];
    if (issue.comments) {
      for (let commentPage = 1; commentPage <= 10; commentPage++) {
        const batch = await github(`/issues/${issue.number}/comments?per_page=100&page=${commentPage}`);
        comments.push(...batch);
        if (batch.length < 100) break;
      }
    }
    const discussion = toDiscussion(issue, comments);
    if (discussion) discussions.push(discussion);
  }
  if (issues.length < 100) break;
  if (page === 20) throw new Error('Too many issues for community snapshot');
}
const [owner, name] = repository.split('/');
const query = `query($owner:String!,$name:String!,$number:Int!,$cursor:String){repository(owner:$owner,name:$name){discussion(number:$number){number url comments(first:100,after:$cursor){pageInfo{hasNextPage endCursor} nodes{databaseId bodyText createdAt url author{login avatarUrl} reactions{totalCount} replies{totalCount}}}}}}`;
const questionDiscussions = [];
const discussionContributions = [];
for (const [question, number] of Object.entries(questionDiscussionNumbers)) {
  let cursor = null;
  const entries = [];
  do {
    const response = await fetch('https://api.github.com/graphql', { method: 'POST', headers: { ...headers, 'Content-Type': 'application/json' }, body: JSON.stringify({ query, variables: { owner, name, number, cursor } }) });
    if (!response.ok) throw new Error(`GitHub discussion ${number}: HTTP ${response.status}`);
    const payload = await response.json();
    if (payload.errors?.length) throw new Error(`GitHub discussion ${number}: ${payload.errors.map(error => error.message).join('; ')}`);
    const discussion = payload.data?.repository?.discussion;
    if (!discussion || discussion.number !== number) throw new Error(`Missing GitHub discussion ${number}`);
    for (const comment of discussion.comments.nodes) {
      if (!comment.bodyText.trim()) continue;
      entries.push({ author: comment.author?.login || 'GitHub 用户', avatar: comment.author?.avatarUrl || '', body: comment.bodyText, createdAt: comment.createdAt, reactions: comment.reactions.totalCount, url: comment.url, replies: comment.replies.totalCount, commentId: comment.databaseId });
      if (comment.author?.login) discussionContributions.push({ github: comment.author.login, label: `${question} · 答案与讨论`, href: comment.url, type: 'content' });
    }
    cursor = discussion.comments.pageInfo.hasNextPage ? discussion.comments.pageInfo.endCursor : null;
    if (!cursor) questionDiscussions.push({ question, number, url: discussion.url, entries });
  } while (cursor);
}
await writeFile('src/data/community-answers.json', `${JSON.stringify({ updatedAt: new Date().toISOString(), discussions, issueContributions, questionDiscussions, discussionContributions }, null, 2)}\n`);
console.log(`Updated ${discussions.length} legacy answer issues and ${questionDiscussions.length} question discussions.`);
