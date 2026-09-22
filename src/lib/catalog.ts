import { getCollection, type CollectionEntry } from 'astro:content';
export type Question = CollectionEntry<'questions'>;
export const categories = {
  algorithm: { label: 'Algorithm', zh: '算法', symbol: 'ƒ', description: '从问题建模到算法设计，关注正确性、复杂度与边界。' },
  probability: { label: 'Probability', zh: '概率', symbol: 'ℙ', description: '从随机现象出发，练习计数、期望与概率推理。' },
  brainteaser: { label: 'Brainteaser', zh: '思维题', symbol: '◇', description: '发现隐藏的结构，用清晰的逻辑拆解看似棘手的问题。' },
} as const;
export const difficulties = { D1: '入门', D2: '基础', D3: '进阶', D4: '挑战', D5: '拓展', Optional: '选做' } as const;
export const weekLabel = (week: number) => String(week).padStart(2, '0');
export const byId = (a: Question, b: Question) => a.data.week - b.data.week || a.data.id.localeCompare(b.data.id, undefined, { numeric: true });
export const newest = (a: Question, b: Question) => b.data.date.localeCompare(a.data.date) || -byId(a, b);
export async function allQuestions() { return (await getCollection('questions')).sort(byId); }
