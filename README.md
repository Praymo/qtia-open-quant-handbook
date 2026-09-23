# QTIA CUHK(SZ) Open Quant Interview Handbook

**一个以 GitHub 为核心、由社区共同维护的量化面试题知识库。**

[阅读展示网站](https://praymo.github.io/qtia-open-quant-handbook/) · [浏览 GitHub 知识库](https://github.com/Praymo/qtia-open-quant-handbook) · [参与贡献](CONTRIBUTING.md)

QTIA CUHK(SZ) Open Quant Interview Handbook is a community-maintained collection of quantitative interview questions. Weekly questions become a persistent, structured knowledge asset; different solution approaches grow through public, attributable contributions.

| Surface | Role |
| --- | --- |
| WeChat Official Account / 微信公众号 | Publishing and distribution; remains the primary weekly publishing channel |
| GitHub repository / 本仓库 | Canonical questions, community solutions, Issues, Pull Requests, attribution, and revision history |
| Static website / 展示网站 | Reading, topic/week archives, filtering, and long-term organization |

The website does not replace the WeChat Official Account. The repository remains readable and useful without the website.

## Start with a question

### Week 01

| ID | Question | Category | Difficulty |
| --- | --- | --- | --- |
| 01.1 | [阶乘末尾的零](content/questions/week-01/01-1-trailing-zeros.md) | Algorithm | D2 基础 |
| 01.2 | [圆周上的蚂蚁](content/questions/week-01/01-2-ants-on-a-circle.md) | Probability | D3 进阶 |
| 01.3 | [金币称重](content/questions/week-01/01-3-coin-weighing.md) | Brainteaser | D4 挑战 |

### Week 02

| ID | Question | Category | Difficulty |
| --- | --- | --- | --- |
| 02.1 | [红黑弃牌](content/questions/week-02/02-1-red-black-cards.md) | Probability | D2 基础 |
| 02.2 | [因数取石子](content/questions/week-02/02-2-divisor-stones.md) | Brainteaser | D3 进阶 |
| 02.3 | [玻璃球测试](content/questions/week-02/02-3-glass-balls.md) | Algorithm | D4 挑战 |
| 02.4 | [掷骰计数的乘积](content/questions/week-02/02-4-dice-count-product.md) | Probability | D5 拓展 |

The initial edition contains seven problems across two weeks, with **no official or generated solutions**. Empty Community Solutions sections invite contributions. Difficulty labels are D1 入门, D2 基础, D3 进阶, D4 挑战, D5 拓展, and Optional 选做.

每道题的同一份 Markdown 文件中都有完整的中文和英文题面。网站先显示中文，英文可展开；仓库中两种语言同样可读。新增题目的构建检查也会要求两种版本齐全。

## Contribute without being a frontend developer

**Fork → Create branch → Add/edit Markdown → Pull Request → Review → Merge**

You can contribute a solution, alternative proof, Python simulation, correction, typo fix, better explanation, tag improvement, website improvement, or review. GitHub Issues are for errors, discussion, clarification, and feature requests.

Start with [CONTRIBUTING.md](CONTRIBUTING.md), the [question template](templates/question.md), or the [solution template](templates/solution.md). You can edit directly on GitHub: installing Node.js is not required for content contributions. Original contributors are not required to maintain their work forever; others may improve it through later PRs.

## Local development

Requirements: Node.js **22.12+** (Node 22 LTS recommended), npm, and Git.

```sh
npm ci
npm run dev
```

Open the local address printed by Astro, normally `http://localhost:4321`. The site is pure static Astro with a small browser script for filters and mobile navigation. There is no backend, database, login, CMS, custom editor, or analytics service.

```sh
npm run check    # content relationships + Astro/TypeScript diagnostics
npm test         # filter combinations, sorting, and math delimiter checks
npm run build    # production HTML and locally bundled assets in dist/
npm run preview  # inspect the production build
```

Astro 7 may automatically background its dev server when launched by an agent. In that environment, `npm run dev -- --ignore-lock` keeps it in the foreground. For a normal background instance, use `npx astro dev stop` to stop it.

### Configuration

Copy `.env.example` to `.env` when configuring a deployment. No API key or secret is needed.

| Variable | Purpose |
| --- | --- |
| `PUBLIC_GITHUB_REPOSITORY` | Optional `owner/repository` override; defaults to `src/data/site.json` |
| `PUBLIC_GITHUB_BRANCH` | Source branch, default `main` |
| `SITE_URL` | Deployment origin, e.g. `https://owner.github.io` |
| `BASE_PATH` | `/repository` for a GitHub project site, `/` for a root-domain site |

Repository settings live in `src/data/site.json`, and links are constructed in `src/lib/site.ts`. Fork maintainers can update the JSON or use the environment override. If a repository is not configured, action buttons lead to explicit setup instructions rather than a fabricated repository. Variables are embedded at build time; rebuild after changes. `.env` is ignored by Git.

## Content architecture

```text
content/
  questions/
    week-01/                       # One Markdown file per problem
    week-02/
  solutions/
    02.3/                          # Created when a solution is submitted
      mathematical-derivation.md
      python-simulation.md
templates/                         # Authoring templates; never published as solutions
src/
  content.config.ts                # Validated question and solution schemas
  data/contributors.json           # Optional curated contributor metadata
  lib/                            # GitHub links, catalog, filtering, math support
  pages/                          # Static pages generated from the content
.github/
  ISSUE_TEMPLATE/
  pull_request_template.md
  workflows/                      # PR validation and GitHub Pages deployment
```

Solution paths above illustrate the architecture; no sample answer is shipped. A solution references a stable question ID and contains a method, title, contributor usernames, date, and optional ordering. Multiple independent files render under the same question. New content automatically updates counts, categories, weeks, filter options, and contributor attribution.

The build rejects invalid metadata, duplicate IDs, mismatched week folders, missing solution attribution, and references to nonexistent questions. Sort order is deterministic: newest uses the `YYYY-MM` issue date, then week and numeric question ID; week is ascending, and difficulty runs D1–D5 then Optional. Filter selections can be shared through the URL.

### Mathematics

KaTeX renders formulas during the build, with its fonts bundled locally. The site supports `\( ... \)`, `\[ ... \]`, `$...$`, and `$$...$$`. For the best GitHub source-page rendering, use dollar delimiters in contributed Markdown. Fenced code and inline code preserve literal delimiters. [Astro's official Markdown processor](https://docs.astro.build/en/guides/markdown-content/) is configured explicitly for the math pipeline.

### Contributors and future integrations

The contributor wall combines `contributors` in questions/solutions with `src/data/contributors.json` for maintainers, reviewers, and non-content contributors. Avatars and profile links use public GitHub usernames. The JSON file is a replaceable input boundary: a future build-time GitHub API job can populate it without changing pages. No live API requests, fabricated Stars, PR counts, or reputation scores are included. Git history and PRs remain the attribution record.

## Deploy

### GitHub Pages

1. Publish this directory as its own public repository with a `main` branch.
2. Open **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. Push to `main` or manually run **Deploy handbook to GitHub Pages**.

The included workflow runs tests, type/content checks, and the production build, then deploys `dist/`. It derives the repository URL, site origin, and project base path from GitHub automatically. No personal access token is required. PRs run checks with read-only permissions; they do not publish the website. The [official Astro GitHub Pages guide](https://docs.astro.build/en/guides/deploy/github/) describes the hosting configuration.

### Vercel

Import this repository, choose the Astro preset, and use `npm run build` with output directory `dist`. `vercel.json` includes these defaults. Set `PUBLIC_GITHUB_REPOSITORY`, `SITE_URL` to your deployed origin, and `BASE_PATH=/`. No server adapter or database is needed.

### Mobile and accessibility

The handbook uses an accessible mobile navigation button, keyboard focus states, a skip link, labeled native filters, live result counts, and scrollable math/code blocks. Desktop sidebar navigation collapses below 800px; controls and content reflow at narrow widths. Core question content and navigation remain available without JavaScript.

## License and disclaimer

Website code and repository documentation: [MIT](LICENSE). Original question and solution content: [CC BY 4.0](LICENSE-CONTENT.md). Preserve attribution and source references; do not contribute material you are not authorized to share.

**This is a community learning project. Solutions may contain errors and should be independently verified.**
