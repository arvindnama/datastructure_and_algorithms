/**
 * Given weights and values of n items, put these items in a knapsack of capacity W to get the maximum total value in the knapsack. In other words, given two integer arrays, val[0..n-1] and wt[0..n-1] represent values and weights associated with n items respectively. Also given an integer W which represents knapsack capacity, find out the items such that sum of the weights of those items of a given subset is smaller than or equal to W. You cannot break an item, either pick the complete item or don’t pick it (0-1 property).
 *
 * https://www.geeksforgeeks.org/printing-items-01-knapsack/?ref=lbp
 */

function printZeroOneKnapsackSolution(
    profit: number[],
    weight: number[],
    w: number
) {
    /**
     * There are 2 possibilities,
     *   1. pick a item is its weight is less then remaining weight of knapsack.
     *      overall price will price of current item + price of items in knapsack
     *      and knapsack will have the new item inside it.
     *   2. choose to ignore the item.
     *      overall price wont change and item is not inside teh knapsack
     *
     *    at anytime best price is max of above to.
     *
     * the recursion ends when we have no more items or weight of knapsack exceeds.
     */

    const map: { [k in string]: [number, number[]] } = {};
    const solve = (
        n: number,
        w: number,
        knapsack: number[]
    ): [number, number[]] => {
        if (n === 0 || w === 0) return [0, knapsack];

        const key = `${n}_${w}`;
        if (map[key]) return map[key];
        let [pick, pickKnapsack] = [0, [] as number[]];

        if (w - weight[n - 1] >= 0) {
            [pick, pickKnapsack] = solve(n - 1, w - weight[n - 1], [
                ...knapsack,
                weight[n - 1],
            ]);
            pick += profit[n - 1];
        }

        const [notPick, notPickKnapsack] = solve(n - 1, w, knapsack);

        return (map[key] =
            pick > notPick ? [pick, pickKnapsack] : [notPick, notPickKnapsack]);
    };

    return solve(profit.length, w, []);
}

console.log(printZeroOneKnapsackSolution([1, 2, 3], [4, 5, 1], 4));
console.log(printZeroOneKnapsackSolution([60, 100, 120], [10, 20, 30], 50));
console.log(
    printZeroOneKnapsackSolution([40, 100, 50, 60], [20, 10, 40, 30], 60)
);
