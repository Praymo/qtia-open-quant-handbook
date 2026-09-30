import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import mapping from '../src/data/question-discussions.json' with { type: 'json' };

// Execute the real fetcher twice against GitHub-shaped responses. The second
// generation must replace the snapshot rather than merge deleted comments back.
test('full snapshots drop deleted comments and link contributions to question discussions', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'qtia-snapshot-'));
  try {
    await mkdir(join(directory, 'src/data'), { recursive: true });
    const mock = join(directory, 'github-mock.mjs');
    await writeFile(mock, `globalThis.fetch = async (url, options) => {
      if (url !== 'https://api.github.com/graphql') return { ok: true, json: async () => [] };
      const { variables: { number } } = JSON.parse(options.body);
      const nodes = number === 13 ? Array.from({ length: Number(process.env.COMMENTS) }, (_, i) => ({
        databaseId: i + 1, body: process.env.CONTENT + ' ' + i, createdAt: '2026-09-30T00:00:00Z',
        url: 'https://github.com/Praymo/qtia-open-quant-handbook/discussions/13#discussioncomment-' + (i + 1),
        author: { login: 'reader', avatarUrl: '' }, reactions: { totalCount: 0 }, replies: { totalCount: 0 }
      })) : [];
      return { ok: true, json: async () => ({ data: { repository: { discussion: {
        number, url: 'https://github.com/Praymo/qtia-open-quant-handbook/discussions/' + number,
        comments: { nodes, pageInfo: { hasNextPage: false, endCursor: null } }
      } } } }) };
    };`);
    for (const [count, content] of [[2, 'Answer'], [2, 'Edited'], [1, 'Edited']]) {
      const run = spawnSync(process.execPath, ['--import', mock, fileURLToPath(new URL('../scripts/fetch-community-answers.mjs', import.meta.url))], {
        cwd: directory, env: { ...process.env, GITHUB_TOKEN: 'test-only', COMMENTS: String(count), CONTENT: content }, encoding: 'utf8',
      });
      assert.equal(run.status, 0, run.stderr);
      const snapshot = JSON.parse(await readFile(join(directory, 'src/data/community-answers.json'), 'utf8'));
      assert.equal(snapshot.questionDiscussions.length, Object.keys(mapping).length);
      assert.equal(snapshot.questionDiscussions.find(item => item.question === '02.1').entries.length, count);
      assert.equal(snapshot.discussionContributions.length, count);
      assert.equal(snapshot.questionDiscussions.find(item => item.question === '02.1').entries[0].body, `${content} 0`);
      assert.ok(snapshot.discussionContributions.every(item => item.href === '/questions/02.1/#discussion'));
      assert.ok(!Number.isNaN(Date.parse(snapshot.updatedAt)));
    }
  } finally { await rm(directory, { recursive: true, force: true }); }
});
