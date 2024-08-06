/**
 * Given a knapsack weight W and a set of n items with certain value vali and weight wti, we need to calculate the maximum amount that could make up this quantity exactly. This is different from classical Knapsack problem, here we are allowed to use unlimited number of instances of an item.

Note: N is always positive i.e greater than zero

https://www.geeksforgeeks.org/unbounded-knapsack-repetition-items-allowed/?ref=lbp
 */

function knapsackUnbounded(
    price: number[],
    weight: number[],
    w: number
): number {
    const map: { [k in string]: number } = {};
    const solve = (n: number, w: number): number => {
        if (n == 0 || w === 0) return 0;
        const key = `${n}_${w}`;
        if (map[key] >= 0) return map[key];
        const pick =
            w - weight[n - 1] < 0
                ? 0
                : price[n - 1] + solve(n, w - weight[n - 1]);
        const notPick = solve(n - 1, w);
        return (map[key] = Math.max(pick, notPick));
    };
    return solve(price.length, w);
}

console.log(knapsackUnbounded([1, 30], [1, 50], 100));
console.log(knapsackUnbounded([10, 40, 50, 70], [1, 3, 4, 5], 8));
