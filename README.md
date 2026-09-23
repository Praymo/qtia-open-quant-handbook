# QTIA CUHK(SZ) 开放量化面试题知识库

[阅读网站](https://praymo.github.io/qtia-open-quant-handbook/) · [按周浏览题目](https://praymo.github.io/qtia-open-quant-handbook/week/) · [反馈专区](https://praymo.github.io/qtia-open-quant-handbook/feedback/) · [参与贡献](CONTRIBUTING.md)

这是一个放在 GitHub 上、由社区一起维护的量化面试题知识库，收录 QTIA 社团每周分享的习题。题目由社团管理团队整理与审核；仓库把题目和社区解答保存为 Markdown，网站负责阅读、筛选和展示。每道题都有中文题面和 English version；不同的推导、证明和模拟可以并列分享。

## QTIA 管理团队的整理与审核

| 期次 | 习题整理 | 习题审核（按姓氏拼音排序，排名不分先后） |
| --- | --- | --- |
| [第一周](https://praymo.github.io/qtia-open-quant-handbook/week/01/) | 郑 Z.R. | 陈 W.S.、江 B.Y.、文 J.、颜 T.Y.、郑 Z.R. |
| [第二周](https://praymo.github.io/qtia-open-quant-handbook/week/02/) | 郑 Z.R. | 江 B.Y.、郑 Z.R. |

署名采用“姓氏＋名字拼音首字母”；每一期的整理与审核同学也列在对应的周次页面。

## 这里能做什么

| 功能 | 怎么用 |
| --- | --- |
| 每周题目 | 从[每周归档](https://praymo.github.io/qtia-open-quant-handbook/week/)进入第一周、第二周等；每期题目各自保存在 `content/questions/week-XX/`。 |
| 找题练习 | 在[题库](https://praymo.github.io/qtia-open-quant-handbook/questions/)按周次、主题、难度和来源筛选。题目页提供中英文题面和上一题、下一题导航。 |
| 提交社区题目 | 在题库点“提交社区题目”，直接贴中文或英文题面；可以建议主题、难度和相关题目，维护者负责核对来源、翻译、编号和排版。 |
| 社区讨论 | 在题目页直接贴答案或想法；GitHub 原帖支持回复和点赞，内容定时同步到网站。 |
| 社区解答 | 经 PR 审核的完整 Markdown 解法单独展示。维护者可将讨论中的成熟解法转成 PR；也可以自己直接提交 Markdown PR。 |
| 勘误与修订 | 发现题意不清、翻译问题或错误，可以在题目页发起 GitHub Issue 或编辑题目。Pull Request 保留审阅和修改记录。 |
| 每周反馈 | 在每周题目列表下方进入该周[反馈专区](https://praymo.github.io/qtia-open-quant-handbook/feedback/)。难度、题量和讲解需求一次填完，到 GitHub 确认提交；每周另有一个自由讨论帖。结果约每小时更新。 |

想先看看内容？直接打开[每周归档](https://praymo.github.io/qtia-open-quant-handbook/week/)或仓库中的 [`content/questions/`](content/questions/)。

## 一起完善

- 想提交社区题目：用[社区题目表单](https://github.com/Praymo/qtia-open-quant-handbook/issues/new?template=question-proposal.yml)粘贴题面和你的建议；也可请认识的 QTIA 管理团队同学代为提交。
- 想写解答：打开一道题，点“直接贴答案”；熟悉 Markdown 的同学也可以直接提 PR。[贡献指南](CONTRIBUTING.md)有具体步骤。
- 想指出问题：在题目页点击“报告问题”；修正错字或翻译时也可以点“编辑题目”。
- 想推荐题目或相关项目：到 [GitHub Discussions](https://github.com/Praymo/qtia-open-quant-handbook/discussions) 说说题目来源、你试过的方法，或项目适合解决什么问题。

## 量化项目地图

如果有兴趣探索量化可以试试这几个。

| 环节 | 项目 | 主要内容 | 仓库 |
| --- | --- | --- | --- |
| 数据接入 | OpenBB | 统一接入公开或授权金融数据，供 Python、API 等研究工具使用。 | [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) |
| 机器学习研究 | Qlib | 金融数据处理、模型训练与量化研究流程。 | [microsoft/qlib](https://github.com/microsoft/qlib) |
| 快速策略试验 | vectorbt | 用数组化方法比较大量信号、参数和回测结果。 | [polakowo/vectorbt](https://github.com/polakowo/vectorbt) |
| 事件驱动回测 | LEAN | 多市场策略回测与实盘执行引擎。 | [QuantConnect/Lean](https://github.com/QuantConnect/Lean) |
| 组合优化 | PyPortfolioOpt | 从预期收益、风险和约束计算投资组合权重。 | [PyPortfolio/PyPortfolioOpt](https://github.com/PyPortfolio/PyPortfolioOpt) |
| 绩效分析 | QuantStats | 计算收益和风险指标，生成策略分析报告。 | [ranaroussi/quantstats](https://github.com/ranaroussi/quantstats) |
| 加密交易所接口 | CCXT | 用较统一的接口读取交易所行情、市场与账户数据。 | [ccxt/ccxt](https://github.com/ccxt/ccxt) |
| 加密策略运行 | Freqtrade | 加密策略回测、模拟运行与自动交易。 | [freqtrade/freqtrade](https://github.com/freqtrade/freqtrade) |

## 本地运行

要在电脑上预览网站，请安装 Node.js 22.12 或更新版本，在仓库根目录运行：

```sh
npm ci
npm run dev
```

提交代码前运行 `npm test`、`npm run check` 和 `npm run build`。合并到 `main` 后，GitHub Actions 会更新网站。内容的许可与来源说明见 [LICENSE-CONTENT.md](LICENSE-CONTENT.md)；网站代码与仓库文档采用 [MIT](LICENSE)。

初始建库：[@Praymo](https://github.com/Praymo)。

---

# QTIA CUHK(SZ) Open Quant Interview Handbook

[Read the website](https://praymo.github.io/qtia-open-quant-handbook/) · [Browse by week](https://praymo.github.io/qtia-open-quant-handbook/week/) · [Weekly feedback](https://praymo.github.io/qtia-open-quant-handbook/feedback/) · [Contribute](CONTRIBUTING.md)

This community-maintained repository collects weekly questions shared by QTIA. The club's management team organizes and reviews each set; the repository keeps the questions and community solutions as Markdown, while the website makes them easier to browse. Each question has a Chinese statement and an English version. Different proofs, derivations, and simulations can be shared side by side.

## QTIA management team's weekly contributions

| Week | Question set organized by | Reviewed by (surname pinyin order; no ranking) |
| --- | --- | --- |
| [Week 1](https://praymo.github.io/qtia-open-quant-handbook/week/01/) | 郑 Z.R. | 陈 W.S., 江 B.Y., 文 J., 颜 T.Y., 郑 Z.R. |
| [Week 2](https://praymo.github.io/qtia-open-quant-handbook/week/02/) | 郑 Z.R. | 江 B.Y., 郑 Z.R. |

Names use the surname and given-name pinyin initials. Each week's archive page also lists the organizers and reviewers.

## What you can do

| Feature | How it works |
| --- | --- |
| Weekly questions | Browse the [weekly archive](https://praymo.github.io/qtia-open-quant-handbook/week/). Each week's source files live in `content/questions/week-XX/`. |
| Find a question | Filter the [question bank](https://praymo.github.io/qtia-open-quant-handbook/questions/) by week, topic, difficulty, and origin. |
| Submit a community question | Paste a Chinese or English statement into the question form. You can suggest a category, difficulty, tags, and a related QTIA question; maintainers handle numbering, translation, and formatting. |
| Discuss a question | Paste an answer or idea from the question page. GitHub hosts replies and reactions, and the site refreshes a read-only snapshot regularly. |
| Share a formal solution | Submit a Markdown PR directly, or a maintainer can promote a discussion answer into a review PR. Only merged solutions appear in the formal section. |
| Correct and improve | Open an Issue or edit a question from its page. Pull Requests retain review and revision history. |
| Give weekly feedback | Answer all three questions on one page, then sign in to GitHub to confirm one submission. Each week also has one open discussion thread. Public results refresh about hourly. |

The [weekly archive](https://praymo.github.io/qtia-open-quant-handbook/week/) and [`content/questions/`](content/questions/) provide the current question index.

## Join in

- To submit a community question, use the [question form](https://github.com/Praymo/qtia-open-quant-handbook/issues/new?template=question-proposal.yml) and paste the statement and any suggestions. A QTIA management team member you know can also submit it for you.
- To contribute a solution, open a question and choose “直接贴答案” (paste an answer) or “用 Markdown 提 PR” (submit a Markdown PR). The [contribution guide](CONTRIBUTING.md) walks through both paths.
- To report a mistake or improve a translation, use the Issue or edit link on the question page.
- To suggest a question or another useful project, start a [GitHub Discussion](https://github.com/Praymo/qtia-open-quant-handbook/discussions) and share the source and why it helps.

## Quant project map

These repositories cover different parts of a research or trading workflow.

| Area | Project | What it does | Repository |
| --- | --- | --- | --- |
| Data access | OpenBB | Connects financial data sources for Python, APIs, and research tools. | [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) |
| Machine learning research | Qlib | Financial data processing, model training, and quantitative research workflows. | [microsoft/qlib](https://github.com/microsoft/qlib) |
| Rapid strategy experiments | vectorbt | Compares many signals, parameters, and backtests with array based tools. | [polakowo/vectorbt](https://github.com/polakowo/vectorbt) |
| Event driven backtesting | LEAN | Engine for multi-market backtests and live algorithm execution. | [QuantConnect/Lean](https://github.com/QuantConnect/Lean) |
| Portfolio optimization | PyPortfolioOpt | Computes portfolio weights from return, risk, and constraint inputs. | [PyPortfolio/PyPortfolioOpt](https://github.com/PyPortfolio/PyPortfolioOpt) |
| Performance analytics | QuantStats | Calculates return and risk metrics and produces strategy reports. | [ranaroussi/quantstats](https://github.com/ranaroussi/quantstats) |
| Crypto exchange API | CCXT | Provides a common interface for exchange market and account data. | [ccxt/ccxt](https://github.com/ccxt/ccxt) |
| Crypto strategy runner | Freqtrade | Runs crypto strategy backtests, dry runs, and automated trading. | [freqtrade/freqtrade](https://github.com/freqtrade/freqtrade) |

## Run locally

To preview the site locally, install Node.js 22.12 or later and run:

```sh
npm ci
npm run dev
```

Before submitting code, run `npm test`, `npm run check`, and `npm run build`. Merging into `main` triggers the GitHub Actions site deployment. See [LICENSE-CONTENT.md](LICENSE-CONTENT.md) for content licensing and provenance; site code and repository docs use [MIT](LICENSE).

Initial repository setup: [@Praymo](https://github.com/Praymo).
