/**
 * Given weights and profits of N items, put these items in a knapsack of capacity W. The task is to print all possible solutions to the problem in such a way that there are no remaining items left whose weight is less than the remaining capacity of the knapsack. Also, compute the maximum profit.
 *
 * https://www.geeksforgeeks.org/0-1-knapsack-problem-to-print-all-possible-solutions/?ref=lbp
 */

function printZeroOneKnapsackAllSolutions(
    profit: number[],
    weight: number[],
    w: number
): Array<[number, number[]]> {
    const res: Array<[number, number[]]> = [];

    /**
     * Idea::
     *   Follow typical 0/1 knapsack problem , except we don't take the Max of 2 outcomes
     *   cos we want to continue to get all possibilities.
     *
     * when n == 0 || w === 0 , we reached a solution
     *   w === 0 means items is the knapsack is the solution
     *   n === 0 , we will need to ensure there is no unpicked item who's weight is less than or equal to remaining weight
     */

    const solve = (
        n: number,
        w: number,
        totalProfit: number,
        knapsack: number[]
    ) => {
        if (w === 0) {
            res.push([totalProfit, knapsack]);
            return;
        }
        if (n === 0) {
            // we need to check if there is no unpicked item who's weight is less than
            // remaining weight
            const unpickedItems = weight.filter(
                (w1) => !knapsack.find((kw) => kw === w1)
            );
            if (totalProfit && unpickedItems.every((i) => i > w))
                res.push([totalProfit, knapsack]);
            return;
        }

        if (w - weight[n - 1] >= 0) {
            solve(n - 1, w - weight[n - 1], totalProfit + profit[n - 1], [
                ...knapsack,
                weight[n - 1],
            ]);
        }
        solve(n - 1, w, totalProfit, knapsack);
    };
    solve(profit.length, w, 0, []);
    return res;
}

console.log(printZeroOneKnapsackAllSolutions([1, 2, 3], [4, 5, 1], 4));
console.log(
    printZeroOneKnapsackAllSolutions([60, 100, 120, 50], [10, 20, 30, 40], 40)
);
console.log(
    printZeroOneKnapsackAllSolutions([60, 100, 120, 50], [10, 20, 30, 40], 50)
);
