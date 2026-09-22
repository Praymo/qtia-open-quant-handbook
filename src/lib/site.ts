import settings from '../data/site.json';
export const siteName = 'QTIA Open Quant Interview Handbook';
export const repository = import.meta.env.PUBLIC_GITHUB_REPOSITORY || settings.repository;
export const branch = import.meta.env.PUBLIC_GITHUB_BRANCH || settings.branch;
if (repository && !/^[\w.-]+\/[\w.-]+$/.test(repository)) throw new Error('PUBLIC_GITHUB_REPOSITORY must be owner/repository');
export const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const url = (path = '/') => `${base}/${path.replace(/^\//, '')}`;
export const repoUrl = repository ? `https://github.com/${repository}` : url('/contributing/#repository-setup');
const repoPath = (path: string) => path.split('/').map(encodeURIComponent).join('/');
export function githubAction(action: 'issue' | 'edit' | 'solution' | 'history', file = '', id = '') {
  if (!repository) return repoUrl;
  if (action === 'issue') return `${repoUrl}/issues/new?template=question.yml&title=${encodeURIComponent(`[${id || 'Discussion'}] `)}`;
  if (action === 'edit') return `${repoUrl}/edit/${encodeURIComponent(branch)}/${repoPath(file)}`;
  if (action === 'history') return `${repoUrl}/commits/${encodeURIComponent(branch)}/${repoPath(file)}`;
  return `${repoUrl}/new/${encodeURIComponent(branch)}/content/solutions/${encodeURIComponent(id)}?filename=your-approach.md&value=${encodeURIComponent(`---\nquestion: "${id}"\ntitle: "Name your approach"\nmethod: "Mathematical derivation / Python simulation / Alternative proof"\ncontributors: ["YOUR-GITHUB-USERNAME"]\ndate: "${new Date().toISOString().slice(0, 10)}"\norder: 0\n---\n\n## Approach\n\nExplain your assumptions and reasoning.\n\n## Derivation or simulation\n\nUse Markdown and LaTeX.\n\n## Validation and limitations\n\nCheck edge cases and explain the limits of your argument.\n`)}`;
}
