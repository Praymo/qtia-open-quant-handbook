import { readFile, writeFile } from 'node:fs/promises';
import { summarizeFeedback } from './feedback-data.mjs';

const feedback = JSON.parse(await readFile('src/data/feedback.json', 'utf8'));
const token = process.env.GITHUB_TOKEN;
if (!token) {
  console.log('No GITHUB_TOKEN: keeping local feedback and discussion snapshots.');
  process.exit(0);
}
const repository = process.env.GITHUB_REPOSITORY || 'Praymo/qtia-open-quant-handbook';
const [owner, name] = repository.split('/');
if (!owner || !name) throw new Error('GITHUB_REPOSITORY must be owner/name.');
const headers = { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' };

const issues = [];
for (let page = 1; page <= 50; page++) {
  const response = await fetch(`https://api.github.com/repos/${repository}/issues?state=all&per_page=100&page=${page}`, { headers });
  if (!response.ok) throw new Error(`GitHub issues: HTTP ${response.status}`);
  const batch = await response.json();
  issues.push(...batch.filter(issue => !issue.pull_request));
  if (batch.length < 100) break;
  if (page === 50) throw new Error('Too many issues to summarize safely.');
}
const updatedAt = new Date().toISOString();
const weeks = summarizeFeedback(issues, feedback);
await writeFile('src/data/feedback-results.json', `${JSON.stringify({ updatedAt, weeks }, null, 2)}\n`);

const query = `query($owner:String!, $name:String!, $number:Int!) {
  repository(owner:$owner, name:$name) {
    discussion(number:$number) {
      number title url comments(last:5) {
        totalCount nodes { bodyText createdAt url author { login } }
      }
    }
  }
}`;
const discussions = [];
for (const group of feedback.weeks) {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { owner, name, number: group.discussion } }),
  });
  if (!response.ok) throw new Error(`GitHub discussion ${group.discussion}: HTTP ${response.status}`);
  const body = await response.json();
  if (body.errors?.length) throw new Error(`GitHub discussion ${group.discussion}: ${body.errors.map(error => error.message).join('; ')}`);
  const discussion = body.data?.repository?.discussion;
  if (!discussion || discussion.number !== group.discussion) throw new Error(`Missing GitHub discussion ${group.discussion}.`);
  discussions.push({
    number: discussion.number,
    title: discussion.title,
    url: discussion.url,
    commentCount: discussion.comments.totalCount,
    comments: discussion.comments.nodes.map(comment => ({ author: comment.author?.login ?? 'GitHub 用户', body: comment.bodyText.slice(0, 500), url: comment.url, createdAt: comment.createdAt })),
  });
}
await writeFile('src/data/discussion-results.json', `${JSON.stringify({ updatedAt, discussions }, null, 2)}\n`);
console.log(`Updated ${weeks.length} weekly feedback summaries and ${discussions.length} discussion threads.`);
