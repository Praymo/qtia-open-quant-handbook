export const answerLabel = 'community-answer';
export const promoteLabel = 'promote-to-solution';

export function parseAnswer(body = '') {
  const match = body.match(/(?:^|\n)### 你的答案(?:或想法)?\s*\n([\s\S]*?)(?=\n### |$)/);
  return (match?.[1] || '').trim();
}

export function questionId(issue) {
  const match = issue.body?.match(/(?:^|\n)### 哪道题？\s*\n\s*(\d{2,}\.\d+)\b/)
    || issue.title?.match(/^\[(\d{2,}\.\d+)\]/);
  return match?.[1] || null;
}

export function isCommunityAnswer(issue) {
  return issue.labels?.some(label => (typeof label === 'string' ? label : label.name) === answerLabel)
    || (issue.title || '').includes('解答投稿') && Boolean(parseAnswer(issue.body));
}

export function toDiscussion(issue, comments = []) {
  const id = questionId(issue);
  if (!id || !isCommunityAnswer(issue)) return null;
  const entries = [
    { author: issue.user?.login || 'GitHub 用户', avatar: issue.user?.avatar_url || '', body: parseAnswer(issue.body), createdAt: issue.created_at, reactions: issue.reactions?.total_count || 0, url: issue.html_url, replies: issue.comments || 0 },
    ...comments.map(comment => ({ author: comment.user?.login || 'GitHub 用户', avatar: comment.user?.avatar_url || '', body: comment.body || '', createdAt: comment.created_at, reactions: comment.reactions?.total_count || 0, url: comment.html_url, replies: 0 })),
  ].filter(entry => entry.body);
  return { question: id, issue: issue.number, url: issue.html_url, entries };
}

export function solutionMarkdown({ question, issueNumber, author, date, body, repository = 'Praymo/qtia-open-quant-handbook', sourceUrl }) {
  if (!/^\d{2,}\.\d+$/.test(question)) throw new Error('Invalid question id');
  if (!/^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/.test(author)) throw new Error('Invalid contributor');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error('Invalid date');
  if (!body?.trim()) throw new Error('Empty answer');
  if (!/^[\w.-]+\/[\w.-]+$/.test(repository)) throw new Error('Invalid repository');
  return `---\nquestion: ${JSON.stringify(question)}\ntitle: ${JSON.stringify(`来自 @${author} 的解法`)}\nmethod: "社区解法"\ncontributors: [${JSON.stringify(author)}]\ndate: ${JSON.stringify(date)}\n---\n\n${body.trim()}\n\n---\n\n[原始讨论与修订记录](${sourceUrl || `https://github.com/${repository}/issues/${issueNumber}`})\n`;
}
