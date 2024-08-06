/**
 * Given an integer array W[] consisting of weights of the items and some queries consisting of capacity C of knapsack, for each query find maximum weight we can put in the knapsack. Value of C doesn’t exceed a certain integer C_MAX.
 *
 * https://www.geeksforgeeks.org/0-1-knapsack-queries/?ref=lbp
 */

function knapsackQueries(weight: number[], queries: number[]): number[] {
    const map: { [k in string]: number } = {};

    const solve = (n: number, w: number): number => {
        if (n === 0 || w === 0) return 0;

        const key = `${n}_${w}`;

        if (map[key] >= 0) return map[key];
        const pick =
            w - weight[n - 1] < 0
                ? 0
                : weight[n - 1] + solve(n - 1, w - weight[n - 1]);
        const notPick = solve(n - 1, w);

        return (map[key] = Math.max(pick, notPick));
    };

    return queries.map((w) => solve(weight.length, w));
}

console.log(knapsackQueries([3, 8, 9], [11, 10, 4]));
console.log(knapsackQueries([1, 5, 10], [6, 14]));
