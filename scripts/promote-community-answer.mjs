import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { questionId, parseAnswer, solutionMarkdown } from './community-answers.mjs';

const token = process.env.GITHUB_TOKEN;
const repository = process.env.GITHUB_REPOSITORY;
const eventPath = process.env.GITHUB_EVENT_PATH;
if (!token || !repository || !eventPath) throw new Error('GitHub Actions environment required');
const event = JSON.parse(await readFile(eventPath, 'utf8'));
const issueNumber = Number(process.env.ISSUE_NUMBER || event.issue?.number);
const commentId = Number(process.env.COMMENT_ID || 0);
if (!Number.isSafeInteger(issueNumber) || issueNumber < 1) throw new Error('Invalid issue number');
const headers = { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' };
async function github(path) {
  const response = await fetch(`https://api.github.com/repos/${repository}${path}`, { headers });
  if (!response.ok) throw new Error(`GitHub ${path}: HTTP ${response.status}`);
  return response.json();
}
const issue = await github(`/issues/${issueNumber}`);
if (issue.pull_request) throw new Error('Source must be an issue');
const id = questionId(issue);
if (!id) throw new Error('Issue has no valid question id');
const questionFiles = await import('node:fs/promises').then(fs => fs.readdir('content/questions', { recursive: true }));
if (!questionFiles.some(file => file.endsWith('.md') && file.includes(id.replace('.', '-')))) throw new Error(`Question ${id} not found`);
let source = issue;
let body = parseAnswer(issue.body);
if (commentId) {
  source = await github(`/issues/comments/${commentId}`);
  if (source.issue_url !== issue.url) throw new Error('Comment does not belong to source issue');
  body = source.body;
}
if (!source.user?.login || !body?.trim()) throw new Error('Source needs an author and answer');
const path = `content/solutions/${id}/issue-${issueNumber}${commentId ? `-comment-${commentId}` : ''}.md`;
await mkdir(`content/solutions/${id}`, { recursive: true });
await writeFile(path, solutionMarkdown({ question: id, issueNumber, author: source.user.login, date: source.created_at.slice(0, 10), body, repository, sourceUrl: source.html_url }), { flag: 'wx' });
console.log(`Prepared ${path} with credit for @${source.user.login}`);
