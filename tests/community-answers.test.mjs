import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseAnswer, questionId, isCommunityAnswer, toDiscussion, issueContribution } from '../scripts/community-answers.mjs';
import questionDiscussions from '../src/data/question-discussions.json' with { type: 'json' };

const issue = { number: 9, title: '[02.3] 解答投稿', body: '### 哪道题？\n\n02.3\n\n### 你的答案\n\n动规\n\n### 还有什么想补充？（可不填）\n\n_No response_', user: { login: 'vfziry', avatar_url: 'https://avatars.githubusercontent.com/u/1' }, labels: [], created_at: '2026-09-23T09:00:00Z', html_url: 'https://github.com/Praymo/qtia-open-quant-handbook/issues/9', reactions: { total_count: 2 }, comments: 1 };
test('existing unlabelled answer issue appears with reactions and replies', () => {
  assert.equal(questionId(issue), '02.3');
  assert.equal(parseAnswer(issue.body), '动规');
  assert.equal(isCommunityAnswer(issue), true);
  const thread = toDiscussion(issue, [{ body: '还可以试贪心吗？', user: { login: 'reader' }, created_at: '2026-09-23T10:00:00Z', html_url: `${issue.html_url}#issuecomment-1`, reactions: { total_count: 3 } }]);
  assert.equal(thread.entries.length, 2);
  assert.equal(thread.entries[0].reactions, 2);
  assert.equal(thread.entries[0].replies, 1);
  assert.equal(thread.entries[1].reactions, 3);
});
test('question discussions map every seed problem and feedback votes do not become contributors', () => {
  assert.deepEqual(Object.keys(questionDiscussions).sort(), ['01.1', '01.2', '01.3', '02.1', '02.2', '02.3', '02.4']);
  assert.equal(new Set(Object.values(questionDiscussions)).size, 7);
  assert.equal(issueContribution(issue)?.github, 'vfziry');
  assert.equal(issueContribution({ ...issue, body: '<!-- qtia-weekly-feedback:v1 -->' }), null);
});
