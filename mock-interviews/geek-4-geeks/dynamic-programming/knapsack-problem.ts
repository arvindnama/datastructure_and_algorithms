/**
 * Given N items where each item has some weight and profit associated with it and also given a bag with capacity W, [i.e., the bag can hold at most W weight in it]. The task is to put the items into the bag such that the sum of profits associated with them is the maximum possible.
 */

/**
 * Idea is to create subsets of items that fit in the knapsack and from those
 * subset extract one who's weight is max
 *
 * Using dynamic programming:
 *  - nth item can either be picked into knapsack (when picked then overall weight of knapsack is reduced) OR
 *  - nth item not picked.
 * Recuse down the tree till we are not left with any item or weight is zero
 *  max profit will be Max ((p[n] + k(w-w[n], n-1)), k(w, n-1))

 *  profits:    [10, 20, 30],
 *  weights:    [1, 1, 1],
 *  knapsack-w: 2,
 *
 * n: is last idx , w is wight of knapsack
 *                        k(3,2) ==> K(n,w)
 *                    /                       \
 *                 k(2,2)                      k(2,1)
 *                 /    \                   /        \
 *              k(1,2) k(1,1)           k(1,1)        k(1,0)
 *              /   |    /  \            /   \          /
 *        k(0,2) k(0,1) k(0,1) k(0,0)  k(0,1) k(0,0)  k(0,0)
 */

const knapsack = (
    profits: number[],
    weights: number[],
    lIdx: number,
    w: number
): number => {
    const map = ((knapsack as any as FuncWithMap).map =
        (knapsack as any as FuncWithMap).map || {});

    if (lIdx < 0 || w === 0) return 0;

    const key = `${lIdx}_${w}`;
    if (map[key]) return map[key] as number;

    const keyForLAbsent = `${lIdx - 1}_${w}`;
    const keyForLPresent = `${lIdx - 1}_${w - weights[lIdx]}`;

    const valueOfProfitWithLAbsent = (map[keyForLAbsent] = knapsack(
        profits,
        weights,
        lIdx - 1,
        w
    ));

    if (weights[lIdx] > w) {
        // item exceeds with , then proceed with eliminating the item
        return valueOfProfitWithLAbsent;
    }

    const valueOfProfitWithLPresent =
        profits[lIdx] +
        (map[keyForLPresent] = knapsack(
            profits,
            weights,
            lIdx - 1,
            w - weights[lIdx]
        ));

    return Math.max(valueOfProfitWithLPresent, valueOfProfitWithLAbsent);
};

console.log(
    'knapsack problem',
    [60, 100, 120],
    [10, 20, 30],
    50,
    knapsack([60, 100, 120], [10, 20, 30], 2, 50)
);

console.log(
    'knapsack problem',
    [30, 20, 10],
    [1, 1, 1],
    2,
    knapsack([10, 20, 30], [1, 1, 1], 2, 2)
);
