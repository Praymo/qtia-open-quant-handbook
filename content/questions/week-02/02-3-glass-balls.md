---
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

A building has $n$ floors, with floor **0** being ground level. There are $k$ identical glass balls.

There is an unknown highest safe floor:

- Dropping from that floor or lower **does not break** the ball.
- Dropping from a higher floor **breaks** the ball.

In each experiment, choose an unbroken ball and drop it from any floor.

Determine the **minimum number of experiments required in the worst case**.

1. A building has **100 floors** and only **2 glass balls**. Provide the optimal strategy.
2. For a building with $n$ floors and $k$ glass balls, provide an algorithm for calculating the minimum number of experiments and analyze its complexity.
