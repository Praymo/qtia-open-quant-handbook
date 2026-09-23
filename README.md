# QTIA CUHK(SZ) 开放量化面试题知识库

[阅读网站](https://praymo.github.io/qtia-open-quant-handbook/) · [浏览题目](content/questions/) · [参与贡献](CONTRIBUTING.md) · [题目维护说明](docs/题目更新维护指南.md)

这里保存量化面试题的中英文题面。GitHub 中的 Markdown 文件是题目和社区解答的原始记录；网站提供按周、主题和难度浏览的页面。更正与解答通过 GitHub 合并请求审阅，作者和修改历史可追溯。

## 题目索引

### 第一周

| 题号 | 题目 | 主题 | 难度 |
| --- | --- | --- | --- |
| 01.1 | [阶乘末尾的零](content/questions/week-01/01-1-trailing-zeros.md) | 算法 | D2 基础 |
| 01.2 | [圆周上的蚂蚁](content/questions/week-01/01-2-ants-on-a-circle.md) | 概率 | D3 进阶 |
| 01.3 | [金币称重](content/questions/week-01/01-3-coin-weighing.md) | 思维题 | D4 挑战 |

### 第二周

| 题号 | 题目 | 主题 | 难度 |
| --- | --- | --- | --- |
| 02.1 | [红黑弃牌](content/questions/week-02/02-1-red-black-cards.md) | 概率 | D2 基础 |
| 02.2 | [因数取石子](content/questions/week-02/02-2-divisor-stones.md) | 思维题 | D3 进阶 |
| 02.3 | [玻璃球测试](content/questions/week-02/02-3-glass-balls.md) | 算法 | D4 挑战 |
| 02.4 | [掷骰计数的乘积](content/questions/week-02/02-4-dice-count-product.md) | 概率 | D5 拓展 |

每道题在同一个 Markdown 文件中提供完整中文题面和英文原题。当前没有预设的官方解答；不同方法可以分别提交到 `content/solutions/题号/`，在题目下并列展示。难度标记为 D1 入门、D2 基础、D3 进阶、D4 挑战、D5 拓展及选做。

## 参与与维护

- 想提交解答、勘误或讨论题意：阅读 [参与贡献说明](CONTRIBUTING.md)。直接在 GitHub 修改 Markdown 即可，不需要安装开发工具。
- 想替换旧题、增加下一周题目或调整元数据：阅读 [题目更新维护指南](docs/题目更新维护指南.md)。题号一旦公开，应保持稳定，以免旧链接与解答失效。
- 想反馈题目难度、题量和解答需求：进入[反馈投票页](https://praymo.github.io/qtia-open-quant-handbook/feedback/)。投票及实时结果由公开的 GitHub Discussions 保存。

## 本地运行与检查

需要 Node.js 22.12 或更新版本、npm 和 Git。在仓库根目录执行：

```sh
npm ci
npm run dev
```

开发服务器会显示本地预览地址。提交或部署前执行：

```sh
npm test
npm run check
npm run build
```

检查涵盖题号、周次文件夹、题目双语区段、解答引用和署名，以及页面构建。数学公式支持 `$...$`、`$$...$$`、`\( ... \)` 和 `\[ ... \]`；为了同时在 GitHub 阅读，推荐美元符号写法。

## 文件与部署

- `content/questions/week-XX/`：每道题一个 Markdown 文件。
- `content/solutions/题号/`：同一题的不同社区解答，各自独立成文件。
- `templates/`：题目和解答模板。
- `src/data/site.json`：公共仓库地址和默认分支。
- `.github/workflows/`：合并请求检查与 GitHub Pages 部署。

合并到 `main` 后，GitHub Actions 会运行检查并更新网站。题目数量、周次、分类筛选和解答展示从内容文件自动生成。部署到其他仓库时，可以修改 `src/data/site.json`，或使用 `PUBLIC_GITHUB_REPOSITORY`、`PUBLIC_GITHUB_BRANCH`、`SITE_URL`、`BASE_PATH` 环境变量。不要把令牌或个人资料写入公开仓库。

网站代码和仓库文档采用 [MIT](LICENSE) 许可；原创题目和解答采用 [CC BY 4.0](LICENSE-CONTENT.md) 许可。引用外部材料时请核对分享权限并注明来源。社区解答可能有错，请独立核验。
