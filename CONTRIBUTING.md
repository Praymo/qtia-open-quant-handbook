# Contributing to the QTIA CUHK(SZ) Handbook

仓库是题目与解答的保存处，网站用于阅读。参与前需要一个 GitHub 账号；写题目或解答时，只需编辑 Markdown 文件。

## 从哪里开始

- **提交解答：**在[网站题库](https://praymo.github.io/qtia-open-quant-handbook/questions/)中打开一道题，点击“提交解答”。可以提交数学推导、另一种证明或 Python 模拟。
- **指出错误或讨论题意：**在题目页点击“报告问题”，写明题号、具体文字及你的理由。
- **修改题面或翻译：**在题目页点击“编辑题目”。小的勘误和更清晰的解释同样欢迎。

## 第一次提交解答

以 [02.3 玻璃球测试](https://praymo.github.io/qtia-open-quant-handbook/questions/02.3/) 为例：

1. 打开题目，点击“提交解答”。GitHub 会打开新文件页面，并预填题号和基本格式。
2. 将 `your-approach.md` 改成说明解法的文件名；填写解法名称、方法、自己的 GitHub 用户名和日期。
3. 写清假设、推导或代码，以及验证和局限。提交修改时，若没有仓库的写入权限，GitHub 会引导你创建自己的仓库副本（Fork）。
4. 向本仓库发起合并请求（Pull Request，简称 PR），说明修改了什么。维护者审阅并合并后，网站会显示这份解答。

只修改错字或解释时，可直接使用“编辑题目”入口。你的提交和审阅记录会保留在 GitHub；原作者无需独自长期维护，其他人可以继续修订。

下面是文件格式和协作规则，供需要自行创建文件或在本地工作的人查阅。

## Add a solution

Use one Markdown file per approach:

```text
content/solutions/02.3/mathematical-derivation.md
content/solutions/02.3/python-simulation.md
```

Each file starts with:

```yaml
---
question: "02.3"
title: "A concise name for your approach"
method: "Mathematical derivation"
contributors: ["your-github-username"]
date: "2026-09-23"
order: 0
---
```

`question` must match an existing question ID, and the containing folder must match that ID. `contributors` contains GitHub usernames without `@`; at least one is required. Use the actual submission date in `YYYY-MM-DD`. `order` is optional (default 0); display order breaks ties by date and filename. This ordering does not indicate correctness or rank.

Explain your assumptions, reasoning, derivation or simulation, validation, and limitations. A simulation should state its random seed, dependencies, number of trials, and what the result does and does not establish. Cite external ideas and sources.

### LaTeX and code

The site accepts all four standard forms:

```latex
Inline: $x^2$ or \(x^2\)

Display:
$$
f(x) = x^2
$$

\[
f(x) = x^2
\]
```

Prefer dollar delimiters so math also renders in GitHub's own Markdown viewer. Put display delimiters on their own lines with blank lines around the block. Escape a literal currency dollar sign as `\$` when necessary. Use fenced code blocks with a language tag such as `python`; formulas inside code blocks remain literal.

Do not include scripts, custom HTML widgets, credentials, or identifying information. Pure Markdown and supported KaTeX formulas are sufficient.

## Add a question

Copy [templates/question.md](templates/question.md) to `content/questions/week-XX/short-name.md`. Include the complete Chinese statement and the complete English statement in this one file. Keep all numbers, events, and rules consistent across the two languages. The build checks for both sections. Fill in the required metadata:

| Field | Rule |
| --- | --- |
| `id` | Stable quoted ID, e.g. `"03.1"`; unique across the repository |
| `title`, `titleEn` | Chinese title and English title |
| `summary` | Short browsing description without revealing a solution |
| `week` | Positive integer matching the folder and ID prefix |
| `date` | Quoted issue month, `"YYYY-MM"` |
| `category` | `algorithm`, `probability`, or `brainteaser` |
| `difficulty` | `D1`, `D2`, `D3`, `D4`, `D5`, or `Optional` |
| `tags` | One or more lowercase kebab-case topic tags |
| `contributors` | GitHub usernames without `@`; use `[]` only for unattributed source imports |

Retain every assumption and sub-question. Attribute the original source when applicable. Do not place a solution in the problem statement. Avoid renumbering existing IDs because links and solutions depend on them. New questions automatically appear in website listings; update the README's index when adding a new week.

## Attribution, ownership, and maintenance

- Preserve prior authors in a solution's `contributors` list. Add your username when making a substantive improvement; small fixes are still recorded in Git history.
- For review, maintenance, or other contributions outside content files, maintainers can add an entry to `src/data/contributors.json` with `username` and `role`.
- Do not invent contribution statistics. The wall is a directory, while Git history and PR discussion provide verifiable attribution.
- Original authors are **not required to maintain a solution forever**. Other contributors may correct or expand it through future PRs.
- Prefer normal merge commits or rebase merges that retain contributor commits. If squashing, preserve author/co-author attribution and the PR link. Do not erase attribution when revising content.

## Review and validation

Reviewers should check the problem interpretation, assumptions, mathematical steps, edge cases, reproducibility, and clarity. For corrections, explain what failed and why the revision fixes it. Approval is not a guarantee of correctness; subsequent counterexamples are welcome.

Automated PR checks validate metadata, references and folders, test filtering and math handling, and build the full static site. Site-code changes can be checked locally with:

```sh
npm ci
npm run check
npm test
npm run build
npm run dev
```

Inspect narrow/mobile layouts, keyboard navigation, filters, empty states, problem pages, math, and GitHub links after UI changes. Please keep the MVP static and maintainable: no backend, database, login system, custom CMS/editor, analytics, or unnecessary animation.

## License

By submitting a contribution, you confirm that you have the right to share it and agree to the applicable repository license: [MIT](LICENSE) for code/documentation, [CC BY 4.0](LICENSE-CONTENT.md) for original questions and solutions. Preserve any third-party attribution and terms. Contributors keep authorship of their work.

This is a community learning project. Solutions may contain errors and should be independently verified.
