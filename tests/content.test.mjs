import test from 'node:test';
import assert from 'node:assert/strict';
import { filterAndSort } from '../src/lib/filter.mjs';
import { normalizeLatex } from '../src/lib/remark-latex-delimiters.mjs';
import { readFileSync, readdirSync } from 'node:fs';
import matter from 'gray-matter';
import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkLatexDelimiters from '../src/lib/remark-latex-delimiters.mjs';
const seedIds = ['01.1', '01.2', '01.3', '02.1', '02.2', '02.3', '02.4'];
// Keep the regression sample stable as future weeks add new questions.
const records = readdirSync('content/questions', { recursive: true }).filter(path => path.endsWith('.md')).map(path => matter(readFileSync(`content/questions/${path}`, 'utf8')).data).filter(question => seedIds.includes(question.id));

test('all seven seed questions retain their IDs', () => {
  for (const id of seedIds) assert.ok(records.some(q => q.id === id));
});
test('week, category, difficulty, and tags compose by intersection', () => {
  assert.deepEqual(filterAndSort(records, { week: '2', category: 'algorithm', difficulty: 'D4', tag: 'optimization' }).map(q => q.id), ['02.3']);
  assert.equal(filterAndSort(records, { category: 'probability' }).length, 3);
  assert.equal(filterAndSort(records, { week: '1' }).length, 3);
  assert.equal(filterAndSort(records, { difficulty: 'D2' }).length, 2);
  assert.equal(filterAndSort(records, { tag: 'expectation' }).length, 2);
  assert.equal(filterAndSort(records, { category: 'algorithm', difficulty: 'D5' }).length, 0);
});
test('sort is deterministic with month-only dates and supports difficulty and week', () => {
  assert.equal(filterAndSort(records, { sort: 'newest' })[0].id, '02.4');
  assert.equal(filterAndSort(records, { sort: 'week' })[0].id, '01.1');
  assert.equal(filterAndSort(records, { sort: 'difficulty' }).at(-1).id, '02.4');
  const extended = [...records, { ...records[0], id: '03.1', week: 3, difficulty: 'Optional' }];
  assert.equal(filterAndSort(extended, { sort: 'difficulty' }).at(-1).difficulty, 'Optional');
});
test('TeX delimiters normalize while inline and fenced code remain literal', () => {
  assert.equal(normalizeLatex(String.raw`Inline \(n!\)`), 'Inline $n!$');
  assert.equal(normalizeLatex(String.raw`\[\mathbb{E}[X]\]`), '$$\\mathbb{E}[X]$$');
  const code = '```python\nprint(r"\\(not math\\)")\n```\n`\\(literal\\)`';
  assert.equal(normalizeLatex(code), code);
  assert.equal(normalizeLatex('Price $10 and $$x^2$$'), 'Price $10 and $$x^2$$');
});

test('actual Markdown pipeline renders all math delimiters and preserves code', async () => {
  const renderer = await createMarkdownProcessor({
    remarkPlugins: [remarkLatexDelimiters, remarkMath],
    rehypePlugins: [[rehypeKatex, { strict: 'error', throwOnError: true }]],
  });
  const source = 'Inline \\(n!\\) and $x^2$.\n\n\\[\n\\mathbb{E}[X]\n\\]\n\n$$\ny^2\n$$\n\n`\\(literal\\)`\n\n```python\nprint(r"\\(not math\\)")\n```';
  const { code } = await renderer.render(source);
  assert.equal((code.match(/class="katex"/g) || []).length, 4);
  assert.equal((code.match(/class="katex-display"/g) || []).length, 2);
  assert.match(code, /<code>\\\(literal\\\)<\/code>/);
  assert.doesNotMatch(code, /katex-error/);
});
