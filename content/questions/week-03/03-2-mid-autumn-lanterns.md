---
origin: official
id: "03.2"
title: "中秋花灯"
titleEn: "Mid-Autumn lanterns"
summary: "随机切换花灯的亮灭状态，求首次回到全灭状态的期望轮数。"
week: 3
date: "2026-09"
category: "probability"
difficulty: "D4"
tags: [markov-chain, expectation, sampling]
contributors: []
---

## 中文题目

有 $n$ 盏编号为 $1,\ldots,n$ 的花灯，初始全灭。每轮独立选灯并切换选中花灯的亮灭状态。设 $p_i>0$，且 $\sum_{i=1}^{n}p_i=1$。

在下列规则下，分别求花灯首次回到全灭状态的期望轮数，并说明理由。

1. 每轮以概率 $p_i$ 选第 $i$ 盏。
2. 每轮选 $k$ 盏不同的灯（$1\le k\le n$）。每次独立抽一盏，抽到第 $i$ 盏的概率为 $p_i$；抽到已选中的灯就重抽，直到选满。

<details>
<summary>English version</summary>

There are $n$ lanterns numbered $1,\ldots,n$, initially all off. In each round, lanterns are selected independently of other rounds, and the on/off state of each selected lantern is toggled. Let $p_i>0$ and $\sum_{i=1}^{n}p_i=1$.

For each of the following selection rules, find the expected number of rounds until the lanterns first return to the all-off state, and explain your reasoning.

1. In each round, select lantern $i$ with probability $p_i$.
2. In each round, select $k$ distinct lanterns, where $1\le k\le n$. Draw one lantern independently at a time, with probability $p_i$ of drawing lantern $i$. If the drawn lantern has already been selected in the current round, draw again. Continue until $k$ distinct lanterns have been selected.

</details>
