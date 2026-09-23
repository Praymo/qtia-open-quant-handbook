import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import matter from 'gray-matter';

async function markdownFiles(directory) {
  const items = await readdir(directory, { withFileTypes: true });
  const results = await Promise.all(items.map(item => item.isDirectory() ? markdownFiles(join(directory, item.name)) : item.name.endsWith('.md') ? [join(directory, item.name)] : []));
  return results.flat().sort();
}
const errors = [];
const ids = new Set();
const questions = await markdownFiles('content/questions');
const solutions = await markdownFiles('content/solutions');
for (const file of questions) {
  const { data, content } = matter(await readFile(file, 'utf8'));
  if (!data.id || ids.has(data.id)) errors.push(`${file}: missing or duplicate question id ${data.id}`);
  ids.add(data.id);
  if (!file.includes(`week-${String(data.week).padStart(2, '0')}/`)) errors.push(`${file}: week folder and metadata must match`);
  if (Number(String(data.id).split('.')[0]) !== data.week) errors.push(`${file}: id prefix and week must match`);
  const chinese = content.match(/^## 中文题目[ \t]*\n([\s\S]*?)(?=^<details>)/m)?.[1]?.trim();
  const english = content.match(/^<details>\s*\n<summary>English version<\/summary>\s*\n([\s\S]*?)^<\/details>\s*$/m)?.[1]?.trim();
  if (!chinese || !english) errors.push(`${file}: include complete Chinese and English problem sections`);
}
for (const file of solutions) {
  const { data, content } = matter(await readFile(file, 'utf8'));
  if (!ids.has(data.question)) errors.push(`${file}: unknown question ${data.question}`);
  if (!file.includes(`/${data.question}/`)) errors.push(`${file}: solution folder must match question id`);
  if (!Array.isArray(data.contributors) || !data.contributors.length) errors.push(`${file}: contributor attribution is required`);
  if (!content.trim()) errors.push(`${file}: solution is empty`);
}
if (!questions.length) errors.push('At least one question is required.');
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Content integrity passed: ${questions.length} questions, ${solutions.length} community solutions.`);
