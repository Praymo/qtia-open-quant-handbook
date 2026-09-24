import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import questionDiscussions from '../src/data/question-discussions.json' with { type: 'json' };
import { questionId, parseAnswer, solutionMarkdown } from './community-answers.mjs';

const token = process.env.GITHUB_TOKEN;
const repository = process.env.GITHUB_REPOSITORY;
const eventPath = process.env.GITHUB_EVENT_PATH;
if (!token || !repository || !eventPath) throw new Error('GitHub Actions environment required');
const event = JSON.parse(await readFile(eventPath, 'utf8'));
const issueNumber = Number(process.env.ISSUE_NUMBER || event.issue?.number || 0);
const discussionNumber = Number(process.env.DISCUSSION_NUMBER || 0);
const commentId = Number(process.env.COMMENT_ID || 0);
if (Boolean(issueNumber) === Boolean(discussionNumber)) throw new Error('Choose exactly one Issue or Discussion');
const headers = { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' };
async function github(path) {
  const response = await fetch(`https://api.github.com/repos/${repository}${path}`, { headers });
  if (!response.ok) throw new Error(`GitHub ${path}: HTTP ${response.status}`);
  return response.json();
}
async function graphql(query, variables) {
  const response = await fetch('https://api.github.com/graphql', { method: 'POST', headers: { ...headers, 'Content-Type': 'application/json' }, body: JSON.stringify({ query, variables }) });
  if (!response.ok) throw new Error(`GitHub GraphQL: HTTP ${response.status}`);
  const payload = await response.json();
  if (payload.errors?.length) throw new Error(payload.errors.map(error => error.message).join('; '));
  return payload.data;
}
let id, author, date, body, sourceUrl, path;
if (discussionNumber) {
  if (!Number.isSafeInteger(discussionNumber) || !Number.isSafeInteger(commentId) || commentId < 1) throw new Error('Discussion number and comment ID required');
  id = Object.keys(questionDiscussions).find(key => questionDiscussions[key] === discussionNumber);
  if (!id) throw new Error('Discussion is not mapped to a question');
  const [owner, name] = repository.split('/');
  const query = `query($owner:String!,$name:String!,$number:Int!,$cursor:String){repository(owner:$owner,name:$name){discussion(number:$number){comments(first:100,after:$cursor){pageInfo{hasNextPage endCursor} nodes{databaseId body createdAt url author{login} replies(first:100){nodes{databaseId body createdAt url author{login}}}}}}}}`;
  let cursor = null;
  let selected = null;
  for (let page = 0; page < 50 && !selected; page++) {
    const result = await graphql(query, { owner, name, number: discussionNumber, cursor });
    const connection = result.repository?.discussion?.comments;
    if (!connection) throw new Error('Discussion not found');
    for (const comment of connection.nodes) {
      selected = [comment, ...comment.replies.nodes].find(item => item.databaseId === commentId) || null;
      if (selected) break;
    }
    cursor = connection.pageInfo.hasNextPage ? connection.pageInfo.endCursor : null;
    if (!cursor) break;
  }
  if (!selected?.author?.login || !selected.body?.trim()) throw new Error('Comment not found or empty');
  ({ body, url: sourceUrl } = selected);
  author = selected.author.login;
  date = selected.createdAt.slice(0, 10);
  path = `content/solutions/${id}/discussion-${discussionNumber}-comment-${commentId}.md`;
} else {
  if (!Number.isSafeInteger(issueNumber) || issueNumber < 1) throw new Error('Invalid issue number');
  const issue = await github(`/issues/${issueNumber}`);
  if (issue.pull_request) throw new Error('Source must be an issue');
  id = questionId(issue);
  if (!id) throw new Error('Issue has no valid question id');
  let selected = issue;
  body = parseAnswer(issue.body);
  if (commentId) {
    selected = await github(`/issues/comments/${commentId}`);
    if (selected.issue_url !== issue.url) throw new Error('Comment does not belong to source issue');
    body = selected.body;
  }
  if (!selected.user?.login || !body?.trim()) throw new Error('Source needs an author and answer');
  author = selected.user.login;
  date = selected.created_at.slice(0, 10);
  sourceUrl = selected.html_url;
  path = `content/solutions/${id}/issue-${issueNumber}${commentId ? `-comment-${commentId}` : ''}.md`;
}
const questionFiles = await readdir('content/questions', { recursive: true });
if (!questionFiles.some(file => file.endsWith('.md') && file.includes(id.replace('.', '-')))) throw new Error(`Question ${id} not found`);
await mkdir(`content/solutions/${id}`, { recursive: true });
await writeFile(path, solutionMarkdown({ question: id, issueNumber, author, date, body, repository, sourceUrl }), { flag: 'wx' });
console.log(`Prepared ${path} with credit for @${author}`);
