import settings from '../data/site.json';
export const siteName = 'QTIA CUHK(SZ) Open Quant Interview Handbook';
export const repository = import.meta.env.PUBLIC_GITHUB_REPOSITORY || settings.repository;
export const branch = import.meta.env.PUBLIC_GITHUB_BRANCH || settings.branch;
if (repository && !/^[\w.-]+\/[\w.-]+$/.test(repository)) throw new Error('PUBLIC_GITHUB_REPOSITORY must be owner/repository');
export const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const url = (path = '/') => `${base}/${path.replace(/^\//, '')}`;
export const repoUrl = repository ? `https://github.com/${repository}` : url('/contributing/#repository-setup');
const repoPath = (path: string) => path.split('/').map(encodeURIComponent).join('/');
export function githubAction(action: 'issue' | 'edit' | 'solution' | 'solution-issue' | 'history', file = '', id = '') {
  if (!repository) return repoUrl;
  if (action === 'issue') return `${repoUrl}/issues/new?template=question.yml&title=${encodeURIComponent(`[${id || 'Discussion'}] `)}`;
  if (action === 'solution-issue') return `${repoUrl}/issues/new?template=solution.yml&title=${encodeURIComponent(`[${id}] 解答投稿`)}`;
  if (action === 'edit') return `${repoUrl}/edit/${encodeURIComponent(branch)}/${repoPath(file)}`;
  if (action === 'history') return `${repoUrl}/commits/${encodeURIComponent(branch)}/${repoPath(file)}`;
  return `${repoUrl}/new/${encodeURIComponent(branch)}/content/solutions/${encodeURIComponent(id)}?filename=my-solution.md&value=${encodeURIComponent(`---\nquestion: "${id}"\ntitle: "我的解法"\nmethod: "推导"\ncontributors: ["把这里改成你的 GitHub 用户名"]\ndate: "${new Date().toISOString().slice(0, 10)}"\n---\n\n在这里写你的答案。可以直接粘贴 Markdown；不必按固定小标题填写。\n`)}`;
}
