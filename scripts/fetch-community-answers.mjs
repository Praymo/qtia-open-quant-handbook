import { writeFile } from 'node:fs/promises';
import { toDiscussion, isCommunityAnswer } from './community-answers.mjs';

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
for (let page = 1; page <= 20; page++) {
  const issues = await github(`/issues?state=all&per_page=100&page=${page}`);
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
await writeFile('src/data/community-answers.json', `${JSON.stringify({ updatedAt: new Date().toISOString(), discussions }, null, 2)}\n`);
console.log(`Updated ${discussions.length} community answer threads.`);
