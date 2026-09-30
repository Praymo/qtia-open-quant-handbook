import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkLatexDelimiters from './src/lib/remark-latex-delimiters.mjs';
import rehypeAccessibleKatex from './src/lib/rehype-accessible-katex.mjs';
import sitemap from '@astrojs/sitemap';

const env = { ...loadEnv(process.env.NODE_ENV || 'production', process.cwd(), ''), ...process.env };

export default defineConfig({
  site: env.SITE_URL || 'https://praymo.github.io',
  base: env.BASE_PATH || (process.env.NODE_ENV === 'production' ? '/qtia-open-quant-handbook' : '/'),
  integrations: [sitemap({ filter: page => !/\/404(?:\.html|\/)?$/.test(new URL(page).pathname) })],
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  markdown: {
    processor: unified({
      remarkPlugins: [remarkLatexDelimiters, remarkMath],
      rehypePlugins: [[rehypeKatex, { strict: 'error', throwOnError: true }], rehypeAccessibleKatex],
    }),
    shikiConfig: { theme: 'github-light' },
  },
});
