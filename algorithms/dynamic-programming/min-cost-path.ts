/**
 * Given a cost matrix cost[][] and a position (M, N) in cost[][], write a function that returns cost of minimum cost path to reach (M, N) from (0, 0). Each cell of the matrix represents a cost to traverse through that cell. The total cost of a path to reach (M, N) is the sum of all the costs on that path (including both source and destination). You can only traverse down, right and diagonally lower cells from a given cell, i.e., from a given cell (i, j), cells (i+1, j), (i, j+1), and (i+1, j+1) can be traversed.
 */

/**
 * Logic:
 * Fact:
 *   At any given cell [i,j] we can move 3 ways
 *   right => [i,j+1]
 *   down => [i +1 ,j]
 *   diagonal-down => [i +1 ,j + 1]
 *
 * to reach [m,n] there are 3 possible way to reach here
 *  [m, n-1] (from left)
 *  [m-1, n] (from top)
 *  [m-1, n-1] (from diagonal left)
 *  (Reversing the move properties)
 *
 * min cost will be cost[m][n] + Min (cost(m,n-1), cost(m-1,n-1), cost(m-1,n))
 */
const minCostPath = (cost: number[][], m: number, n: number): number => {
    if (m < 0 || n < 0) return 0;

    const map = ((minCostPath as any as FuncWithMap).map =
        (minCostPath as any as FuncWithMap).map || {});

    if (map[`${m}_${n}`]) return map[`${m}_${n}`] as number;
    return (map[`${m}_${n}`] =
        cost[m][n] +
        Math.min(
            minCostPath(cost, m, n - 1),
            minCostPath(cost, m - 1, n),
            minCostPath(cost, m - 1, n - 1)
        ));
};

const costArr = [
    [1, 2, 3],
    [4, 8, 2],
    [1, 5, 3],
];

console.log('Min cost path', costArr, minCostPath(costArr, 2, 2));
