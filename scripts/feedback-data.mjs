export function parseFeedbackIssue(issue, feedback) {
  const match = issue.body?.match(/<!-- qtia-weekly-feedback:v1\r?\n([^\r\n]+)\r?\n-->/);
  if (!match || !issue.user?.login) return null;
  let answer;
  try { answer = JSON.parse(match[1]); } catch { return null; }
  if (!feedback.weeks.some(item => item.week === answer.week)) return null;
  if (!feedback.questions.every(question => question.options.includes(answer[question.key]))) return null;
  return { week: answer.week, author: issue.user.login.toLowerCase(), createdAt: issue.created_at, number: issue.number, answers: answer };
}

export function summarizeFeedback(issues, feedback) {
  const byPersonAndWeek = new Map();
  for (const issue of issues) {
    const submission = parseFeedbackIssue(issue, feedback);
    if (!submission) continue;
    const key = `${submission.week}:${submission.author}`;
    const previous = byPersonAndWeek.get(key);
    if (!previous || submission.createdAt > previous.createdAt || (submission.createdAt === previous.createdAt && submission.number > previous.number)) byPersonAndWeek.set(key, submission);
  }
  return feedback.weeks.map(({ week }) => {
    const submissions = [...byPersonAndWeek.values()].filter(item => item.week === week);
    return {
      week,
      total: submissions.length,
      questions: feedback.questions.map(question => ({
        key: question.key,
        options: question.options.map(label => ({ label, votes: submissions.filter(item => item.answers[question.key] === label).length })),
      })),
    };
  });
}
