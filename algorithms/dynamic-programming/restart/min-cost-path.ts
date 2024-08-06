/***
 * Given a cost matrix cost[][] and a position (M, N) in cost[][], write a function that returns cost of minimum cost path to reach (M, N) from (0, 0). Each cell of the matrix represents a cost to traverse through that cell. The total cost of a path to reach (M, N) is the sum of all the costs on that path (including both source and destination). You can only traverse down, right and diagonally lower cells from a given cell, i.e., from a given cell (i, j), cells (i+1, j), (i, j+1), and (i+1, j+1) can be traversed.

Note: You may assume that all costs are positive integers.


https://www.geeksforgeeks.org/min-cost-path-dp-6
 */

const findMinCostPath = (costs: number[][], m: number, n: number): number => {
    /**
     * To reach m,n we can reach here in 3 possible ways
     * m-1, n-1 or m-1, n or m, n-1 so total cost will be min of all these 3 + cost[m][n]
     * we can use memoization to reduce repeated calls.
     */

    if (m < 0 || n < 0) return Number.MAX_SAFE_INTEGER;
    if (m == 0 && n === 0) return costs[0][0];
    const map = ((findMinCostPath as any as FuncWithMap).map =
        (findMinCostPath as any as FuncWithMap).map || {});

    const key = `${m}_${n}`;
    if (map[key]) return map[key] as number;

    return (map[key] =
        costs[m][n] +
        Math.min(
            findMinCostPath(costs, m - 1, n - 1),
            findMinCostPath(costs, m, n - 1),
            findMinCostPath(costs, m - 1, n)
        ));
};

console.log(
    findMinCostPath(
        [
            [1, 2, 3],
            [4, 8, 2],
            [1, 5, 3],
        ],
        2,
        2
    )
);
