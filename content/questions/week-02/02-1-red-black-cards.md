---
origin: official
id: "02.1"
title: "红黑弃牌"
titleEn: "Red and black cards"
summary: "逐对翻开一副扑克牌，这场游戏的公平入场价是多少？"
week: 2
date: "2026-09"
category: "probability"
difficulty: "D2"
tags: [card-games, expectation]
contributors: []
---

## 中文题目

一副牌有 **26 张红牌**和 **26 张黑牌**，充分洗匀后，每次翻开两张：

| 两张牌的颜色 | 结果 |
| --- | --- |
| 黑黑（BB） | 庄家赢一局 |
| 红红（RR） | 玩家赢一局 |
| 一红一黑 | 弃掉，不计入任一方胜局 |

处理完整副牌后，若玩家赢的局数**严格多于**庄家赢的局数，玩家获得 **10 元**；否则不获得奖金。

求这场游戏的公平入场价。

<details>
<summary>English version</summary>

A deck contains **26 red cards** and **26 black cards** and is shuffled.

Reveal two cards at a time:

| Pair | Outcome |
| --- | --- |
| BB — two black cards | Dealer wins |
| RR — two red cards | Player wins |
| Mixed colors | Discard |

After processing the whole deck, the player receives **10 RMB** if the number of player wins exceeds the number of dealer wins. Otherwise, the player receives nothing.

Find the **fair entry price**.

</details>
