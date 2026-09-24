import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

test('a Discussion comment becomes a credited Markdown draft before review', async () => {
  const originalDirectory = process.cwd();
  const originalFetch = globalThis.fetch;
  const keys = ['GITHUB_TOKEN', 'GITHUB_REPOSITORY', 'GITHUB_EVENT_PATH', 'DISCUSSION_NUMBER', 'COMMENT_ID', 'ISSUE_NUMBER'];
  const previous = Object.fromEntries(keys.map(key => [key, process.env[key]]));
  const directory = await mkdtemp(join(tmpdir(), 'qtia-promotion-'));
  try {
    await mkdir(join(directory, 'content/questions/week-02'), { recursive: true });
    await writeFile(join(directory, 'content/questions/week-02/02-3-test.md'), '---\nid: "02.3"\n---\n');
    await writeFile(join(directory, 'event.json'), '{}');
    process.chdir(directory);
    Object.assign(process.env, { GITHUB_TOKEN: 'test', GITHUB_REPOSITORY: 'Praymo/qtia-open-quant-handbook', GITHUB_EVENT_PATH: join(directory, 'event.json'), DISCUSSION_NUMBER: '15', COMMENT_ID: '123', ISSUE_NUMBER: '' });
    globalThis.fetch = async () => ({ ok: true, json: async () => ({ data: { repository: { discussion: { comments: { pageInfo: { hasNextPage: false, endCursor: null }, nodes: [{ databaseId: 123, body: '## 递推\n\n答案内容', createdAt: '2026-09-24T10:00:00Z', url: 'https://github.com/Praymo/qtia-open-quant-handbook/discussions/15#discussioncomment-123', author: { login: 'vfziry' }, replies: { nodes: [] } }] } } } } }) });
    await import('../scripts/promote-community-answer.mjs?test=discussion');
    const output = await readFile(join(directory, 'content/solutions/02.3/discussion-15-comment-123.md'), 'utf8');
    assert.match(output, /contributors: \["vfziry"\]/);
    assert.match(output, /question: "02.3"/);
    assert.match(output, /答案内容/);
    assert.match(output, /discussioncomment-123/);
  } finally {
    process.chdir(originalDirectory);
    globalThis.fetch = originalFetch;
    for (const key of keys) previous[key] === undefined ? delete process.env[key] : process.env[key] = previous[key];
    await rm(directory, { recursive: true, force: true });
  }
});
