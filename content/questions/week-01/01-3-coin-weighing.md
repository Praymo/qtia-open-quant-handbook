---
id: "01.3"
title: "金币称重"
titleEn: "Coin weighing"
summary: "三袋金币、一台电子秤，最少需要称几次？"
week: 1
date: "2026-09"
category: "brainteaser"
difficulty: "D4"
tags: [measurement, integer-constraints, optimization]
contributors: []
---

## 中文题目

有三袋金币，每袋都有足够多的金币。同一袋中的金币质量相同，且质量以克计为整数。

你有一台称重容量不受限制的电子秤。每次称重时，可以分别从三袋中取出任意有限数量的金币（也可以从某袋取 0 枚），测得它们的总质量。

分别回答下列问题，并使称重次数最少：

1. 一袋金币的质量为 **9 克或 11 克**，另两袋金币的正常质量均为 **10 克**。找出异常的一袋，并判断它比正常金币轻还是重。
2. 一袋金币的质量与另两袋恰好相差 **1 克**，但正常质量未知。找出异常的一袋，并判断它比正常金币轻还是重。
3. 确定三袋金币各自的单枚质量。

<details>
<summary>English version</summary>

There are three bags containing sufficiently many coins. Within each bag, all coins have the same integer mass in grams.

You have an electronic scale with unlimited capacity. In each weighing, you may take any finite number of coins, including zero, from each bag and measure the total mass.

**Minimize the number of weighings.**

1. One bag contains coins weighing either **9g or 11g**. The other two contain normal **10g** coins. Identify the abnormal bag and determine whether it is lighter or heavier.
2. One bag differs by exactly **1g** from the other two bags. The normal mass is unknown. Identify the abnormal bag and determine whether it is lighter or heavier.
3. Determine the individual coin mass of all three bags.

</details>
