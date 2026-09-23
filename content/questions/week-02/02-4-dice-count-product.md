---
origin: official
id: "02.4"
title: "掷骰计数的乘积"
titleEn: "Product of dice counts"
summary: "固定次数与集齐六面两种停止条件下，计数乘积的期望。"
week: 2
date: "2026-09"
category: "probability"
difficulty: "D5"
tags: [expectation, stopping-times, dice]
contributors: []
---

## 中文题目

独立地反复掷一枚公平的六面骰子。实验结束时，记 $N_i$ 为点数 $i$ 出现的次数。分别求下列两种情况下的期望：

$$
\mathbb{E}\!\left[N_1 N_2 N_3 N_4 N_5 N_6\right]
$$

1. 恰好掷 $n$ 次骰子。
2. 一直掷到 **六种点数都至少出现一次**为止。

<details>
<summary>English version</summary>

Repeatedly roll a fair six-sided die independently. At the end of the experiment, let $N_i$ be the number of occurrences of face $i$.

Find:

$$
\mathbb{E}\!\left[N_1 N_2 N_3 N_4 N_5 N_6\right]
$$

for:

1. Rolling the die exactly $n$ times.
2. Continuing until **all six faces have appeared at least once**.

</details>
