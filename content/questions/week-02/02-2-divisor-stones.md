---
id: "02.2"
title: "因数取石子"
titleEn: "The divisor stone game"
summary: "只能取走当前石子数的正因数，谁能保证获胜？"
week: 2
date: "2026-09"
category: "brainteaser"
difficulty: "D3"
tags: [game-theory, divisibility, optimal-play]
contributors: []
---

## 中文题目

一堆石子最初有 $n$ 颗。玩家 A 和 B 轮流取石子。每次取走的数量必须是**当前石子数的一个正因数**。取走最后一颗石子的玩家判负。

A 先手，双方都采取最优策略。回答：

1. 当 $n = 2026$ 时，谁能保证获胜？
2. 对任意正整数 $n$，若禁止一次恰好取走 **1 颗**，并规定**无合法操作的一方判负**，谁能保证获胜？

<details>
<summary>English version</summary>

A pile initially contains $n$ stones. Players A and B alternate removing stones.

On each turn, the number removed must be a **positive divisor** of the current number of stones. The player who takes the **last stone loses**.

A moves first and both players use optimal strategies.

1. When $n = 2026$, who can guarantee a win?
2. For general positive integer $n$, if removing exactly **1 stone is forbidden**, and a player **unable to move loses**, who can guarantee a win?

</details>
