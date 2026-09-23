import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { parseFeedbackIssue, summarizeFeedback } from '../scripts/feedback-data.mjs';

const feedback = JSON.parse(await readFile(new URL('../src/data/feedback.json', import.meta.url), 'utf8'));
function issue(number, author, answers, createdAt = '2026-09-23T01:00:00Z') {
  return {
    number,
    user: { login: author },
    created_at: createdAt,
    body: `<!-- qtia-weekly-feedback:v1\n${JSON.stringify(answers)}\n-->\n\n## 反馈`,
  };
}

test('one issue carries all three answers and invalid choices are ignored', () => {
  const answers = { week: 2, difficulty: '适中', volume: '较多', explanation: '希望补充文字解答' };
  assert.equal(parseFeedbackIssue(issue(1, 'A', answers), feedback)?.answers.volume, '较多');
  assert.equal(parseFeedbackIssue(issue(2, 'A', { ...answers, volume: '未定义' }), feedback), null);
  assert.equal(parseFeedbackIssue({ ...issue(3, 'A', answers), body: 'ordinary issue' }, feedback), null);
});

test('latest complete feedback per GitHub user and week is counted once', () => {
  const first = { week: 2, difficulty: '适中', volume: '较少', explanation: '目前可以自行解决' };
  const revised = { ...first, difficulty: '较困难', volume: '适中' };
  const summary = summarizeFeedback([
    issue(1, 'Alice', first),
    issue(2, 'alice', revised, '2026-09-23T02:00:00Z'),
    issue(3, 'Bob', first),
    issue(4, 'Alice', { ...first, week: 1 }),
  ], feedback);
  const week2 = summary.find(item => item.week === 2);
  assert.equal(week2.total, 2);
  assert.deepEqual(week2.questions.find(item => item.key === 'difficulty').options.map(option => option.votes), [0, 1, 1]);
  assert.equal(summary.find(item => item.week === 1).total, 1);
});
