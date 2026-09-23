---
question: "01.1"
title: "数一数阶乘中有多少个 5"
method: "数学推导"
contributors: ["Praymo"]
date: "2026-09-23"
---

## 思路与假设

十进制数末尾每多一个零，就要多一个因子 $10=2\times5$。在 $n!=1\times2\times\cdots\times n$ 中，因子 2 总比因子 5 多，所以末尾零的个数由因子 5 的总数决定。

## 推导

先看 $100!$：$1$ 到 $100$ 中有 $\lfloor100/5\rfloor=20$ 个 5 的倍数，它们各提供至少一个因子 5；其中还有 $\lfloor100/25\rfloor=4$ 个 25 的倍数，各再提供一个。因为 $100<125$，不用继续数。因此

$$
\operatorname{zeros}(100!)=\left\lfloor\frac{100}{5}\right\rfloor+\left\lfloor\frac{100}{25}\right\rfloor=20+4=24.
$$

一般地，5 的倍数贡献第一个因子 5，25 的倍数贡献第二个，125 的倍数贡献第三个，以此类推：

$$
\operatorname{zeros}(n!)=\sum_{k\geq1}\left\lfloor\frac{n}{5^k}\right\rfloor.
$$

计算时无需真的求出 $n!$：

```text
count = 0
while n > 0:
    n = n // 5
    count += n
return count
```

每轮把 $n$ 除以 5，循环 $\lfloor\log_5 n\rfloor+1$ 次，时间复杂度为 $O(\log n)$，额外空间为 $O(1)$。

## 验证与局限

$4!=24$ 没有末尾零，公式得到 $0$；$25!$ 中 25 本身贡献两个因子 5，公式得到 $\lfloor25/5\rfloor+\lfloor25/25\rfloor=6$。这里计算的是**十进制**末尾零；换成其他进制时，不能直接套用数因子 5 的方法。
