/**
 * Given N items where each item has some weight and profit associated with it and also given a bag with capacity W, [i.e., the bag can hold at most W weight in it]. The task is to put the items into the bag such that the sum of profits associated with them is the maximum possible.

Note: The constraint here is we can either put an item completely into the bag or cannot put it at all [It is not possible to put a part of an item into the bag].

  There are 2 possibilities that can happen
    1. we pick the item
        if we pick the item overall weight reduces and total profit increases
    2. we don't pick an item

    we end when we have no item left to pick or weight is less or equal to zero.
    max Profit will always be one of the 2 possibilities
 */

const solve0_1_KnapsackProblem = (
    profit: number[],
    weight: number[],
    n: number,
    w: number
): number => {
    if (w === 0 || n === 0) return 0;
    const profitIfPickItem =
        w - weight[n - 1] < 0
            ? 0
            : profit[n - 1] +
              solve0_1_KnapsackProblem(
                  profit,
                  weight,
                  n - 1,
                  w - weight[n - 1]
              );

    const profitIfNotPickItem = solve0_1_KnapsackProblem(
        profit,
        weight,
        n - 1,
        w
    );

    return Math.max(profitIfPickItem, profitIfNotPickItem);
};

console.log(solve0_1_KnapsackProblem([1, 2, 3], [4, 5, 1], 3, 4));
console.log(solve0_1_KnapsackProblem([60, 100, 120], [10, 20, 30], 3, 50));
