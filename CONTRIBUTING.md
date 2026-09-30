# 参与 QTIA CUHK(SZ) 知识库

欢迎分享你觉得有趣的题目和解法。登录 GitHub 后可以直接贴出内容

## 你可以做的

- 提交社区题目：在[网站题库](https://praymo.github.io/qtia-open-quant-handbook/questions/)点“提交社区题目”，或直接打开[社区题目表单](https://github.com/Praymo/qtia-open-quant-handbook/issues/new?template=question-proposal.yml)。粘贴中文或英文题面；主题、难度、标签、相关题目和出处都可选填，题号、翻译与排版由维护者处理。
- 提交答案：在[网站题库](https://praymo.github.io/qtia-open-quant-handbook/questions/)打开一道题，点击“直接贴答案”，在这道题的 Discussion 里粘贴正文。想法和完整答案都可以，支持 Markdown、`$...$` 和 `$$...$$` 公式；部署完成后显示在题目下的“社区讨论”，并以你的 GitHub 账号署名出现在贡献者页面。
- 指出错误或讨论题意：在题目页点击“报告问题”，写明题号、相关文字和理由。
- 修改题面或翻译：在题目页点击“编辑题目”。小勘误和更清晰的解释同样欢迎。

## 第一次用 GitHub 提交

以 [02.3 玻璃球测试](https://praymo.github.io/qtia-open-quant-handbook/questions/02.3/) 为例：

1. 打开题目，点击“直接贴答案”，登录 GitHub 后把答案粘贴到这道题的 Discussion。
2. 点 “Comment” 发布。你的答案会显示在题目页；别人可以在原帖回复、点赞。网站会定时同步。

写出结论和关键思路即可，正文可以按自己的方式组织。提交后其他人可以在原帖回复、点赞；讨论贡献会以 GitHub 账号署名。修改题面错字或解释时，可以用“编辑题目”入口。

## 公式与代码

行内公式可以写 `$x^2$`，独立公式可以写：

```text
$$
f(x) = x^2
$$
```

网站也支持 `\( ... \)` 和 `\[ ... \]`。推荐美元符号写法，方便在 GitHub 直接阅读。代码块请注明语言，例如 `python`。不要提交密码、令牌、个人信息或需要运行的自定义 HTML 脚本。

## 想自己用 Markdown 新增或修改题目

下面的格式供自己提交 Markdown 题目文件时参考。使用“分享新题目”表单时，维护者会处理这些字段。自己提 PR 时，请先阅读 [题目更新维护指南](docs/题目更新维护指南.md)，从 [题目模板](templates/question.md)复制新文件到 `content/questions/week-XX/`。同一文件包含完整的中文和英文题面；数字、事件、规则和小问请逐项核对。答案发到对应题目的 Discussion。

文件头需要填写：

| 字段 | 要求 |
| --- | --- |
| `id` | 稳定且唯一的题号，例如 `"03.1"`；与周次一致 |
| `title`、`titleEn` | 中文和英文标题 |
| `summary` | 不剧透答案的简短中文摘要 |
| `week` | 正整数；与所在 `week-XX` 文件夹一致 |
| `date` | 期次月份，格式为 `"YYYY-MM"` |
| `category` | `algorithm`、`probability` 或 `brainteaser` |
| `difficulty` | `D1` 到 `D5`，或 `Optional` |
| `tags` | 至少一个小写英文主题标签，用连字符分词 |
| `contributors` | GitHub 用户名列表；无明确作者的历史导入可用 `[]` |

公开后的题号不要随意更改，因为旧链接和对应的 Discussion 依赖它。引用题目来源时请注明出处，确认有权公开分享。

如果改动了网站代码，请在本地运行：

```sh
npm ci
npm test
npm run check
npm run build
```

网站界面的更改还应检查手机宽度、键盘导航、筛选、空状态、公式和 GitHub 链接。

## 来源与许可

投稿者需确认自己有权分享内容。代码和文档按 [MIT](LICENSE) 许可；内容的许可范围和来源说明见 [LICENSE-CONTENT.md](LICENSE-CONTENT.md)。引用第三方材料时，请保留来源和许可信息。
