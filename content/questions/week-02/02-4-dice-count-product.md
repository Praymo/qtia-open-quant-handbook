---
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

Repeatedly roll a fair six-sided die independently. At the end of the experiment, let $N_i$ be the number of occurrences of face $i$.

Find:

$$
\mathbb{E}\!\left[N_1 N_2 N_3 N_4 N_5 N_6\right]
$$

for:

1. Rolling the die exactly $n$ times.
2. Continuing until **all six faces have appeared at least once**.
