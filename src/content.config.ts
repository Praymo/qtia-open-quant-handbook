import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const username = z.string().regex(/^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/);
const questions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/questions', generateId: ({ data }) => String(data.id) }),
  schema: z.object({
    id: z.string().regex(/^\d{2,}\.\d+$/),
    title: z.string().min(1),
    titleEn: z.string().min(1),
    summary: z.string().min(1),
    week: z.number().int().positive(),
    date: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/),
    category: z.enum(['algorithm', 'probability', 'brainteaser']),
    difficulty: z.enum(['D1', 'D2', 'D3', 'D4', 'D5', 'Optional']),
    tags: z.array(z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)).min(1),
    contributors: z.array(username).default([]),
    origin: z.enum(['official', 'community']),
    submittedBy: z.string().min(1).optional(),
    relatedTo: z.string().regex(/^\d{2,}\.\d+$/).optional(),
  }),
});
const solutions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/solutions' }),
  schema: z.object({
    question: reference('questions'),
    title: z.string().min(1),
    method: z.string().min(1),
    contributors: z.array(username).min(1),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    order: z.number().int().nonnegative().default(0),
  }),
});
export const collections = { questions, solutions };
