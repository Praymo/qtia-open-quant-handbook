# Contributing to the QTIA Handbook

欢迎贡献。你可以只写 Markdown 与 LaTeX，无需懂前端，也无需承诺永久维护你的解答。

The repository is the knowledge base; the website is its reading interface. Every contribution is attributable through Git history and Pull Requests. Multiple approaches are welcome—there is no single official answer.

## What can I contribute?

- A new solution or alternative proof
- A reproducible Python simulation
- A correction, typo fix, or clearer explanation
- Better tags or metadata
- A new weekly question you have the right to share
- A website improvement or a thoughtful review

Use Issues for errors, discussions, question clarification, and feature requests. Include the question ID, relevant quotation, and an example or explanation. Never include credentials, private conversations, or personal information.

## Browser-only workflow

1. Open the repository and click **Fork** to create your own copy.
2. Create a descriptive branch, for example `solution/02-3-your-approach`.
3. Copy the [solution template](templates/solution.md) into `content/solutions/02.3/your-approach.md`. On the website, **Submit Solution** opens GitHub with a prefilled file; GitHub will guide users without write access through forking.
4. Replace template placeholders, write your contribution, and commit it to your branch.
5. Open a **Pull Request** to this repository's `main` branch. Describe what changed and how you checked it.
6. Discuss review feedback. A maintainer reviews the work and merges it when ready.

For a correction, open the existing file and use GitHub's edit button instead of adding a duplicate. **Edit this page** on a problem links to its exact Markdown file. Contributors only editing content do not have to install or run the site; automated checks run on the PR.

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

Copy [templates/question.md](templates/question.md) to `content/questions/week-XX/short-name.md`. Fill in the required metadata:

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
