---
origin: official
id: "02.3"
title: "玻璃球测试"
titleEn: "The glass ball problem"
summary: "在最坏情况下，用最少的实验确定最高安全楼层。"
week: 2
date: "2026-09"
category: "algorithm"
difficulty: "D4"
tags: [dynamic-programming, optimization, worst-case-analysis]
contributors: []
---

## 中文题目

一栋建筑有 $n$ 层，**0 层**为地面。现有 $k$ 个相同的玻璃球。最高安全楼层未知，但满足：

- 从该楼层或更低的楼层抛下，玻璃球**不会碎**。
- 从更高的楼层抛下，玻璃球**会碎**。

每次实验可以选一个尚未碎裂的玻璃球，从任意楼层抛下。求**最坏情况下确定最高安全楼层所需的最少实验次数**。

1. 一栋 **100 层**的建筑只有 **2 个玻璃球**。给出最优策略。
2. 对一般的 $n$ 层建筑和 $k$ 个玻璃球，给出计算最少实验次数的算法，并分析其复杂度。

<details>
<summary>English version</summary>

A building has $n$ floors, with floor **0** being ground level. There are $k$ identical glass balls.

There is an unknown highest safe floor:

- Dropping from that floor or lower **does not break** the ball.
- Dropping from a higher floor **breaks** the ball.

In each experiment, choose an unbroken ball and drop it from any floor.

Determine the **minimum number of experiments required in the worst case**.

1. A building has **100 floors** and only **2 glass balls**. Provide the optimal strategy.
2. For a building with $n$ floors and $k$ glass balls, provide an algorithm for calculating the minimum number of experiments and analyze its complexity.

</details>
