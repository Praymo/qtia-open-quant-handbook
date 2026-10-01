---
origin: "official"
id: "04.3"
title: "股票交易策略"
titleEn: "Stock trading strategies"
summary: "在交易次数和开平仓时间限制下，设计允许或不允许做空的最优交易算法。"
week: 4
date: "2026-10"
category: "algorithm"
difficulty: "D4"
tags: ["dynamic-programming", "optimization", "trading"]
contributors: []
---

## 中文题目

已知一只股票连续 $n$ 天的价格和正整数 $k$。每笔交易只涉及一股，开仓与平仓须在不同天；同一时间至多有一笔未完成的交易，平仓当天不能再次开仓。可以不交易。

在下列条件下，分别设计求最大总利润的算法，分析复杂度并说明正确性。

1. 最多进行 $k$ 次先买后卖的交易。
2. 最多进行 $k$ 次交易，每笔还可选择先卖后买回（做空）。

<details>
<summary>English version</summary>

You are given the prices of a stock over $n$ consecutive days and a positive integer $k$. Each transaction involves one share, and opening and closing must occur on different days. At most one transaction may remain open at any time, and a new transaction cannot be opened on the day another is closed. Making no transactions is allowed.

For each case below, design an algorithm to maximize total profit, analyze its complexity, and explain why it is correct.

1. At most $k$ transactions, each consisting of buying first and selling later.
2. At most $k$ transactions, each of which may also consist of selling first and buying back later (short selling).

</details>
