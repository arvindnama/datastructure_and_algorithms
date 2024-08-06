/**
 * Given a grid of size m * n, let us assume you are starting at (1, 1) and your goal is to reach (m, n). At any instance, if you are on (x, y), you can either go to (x, y + 1) or (x + 1, y).
Now consider if some obstacles are added to the grids. How many unique paths would there be?
An obstacle and space are marked as 1 and 0 respectively in the grid.
 * https://www.geeksforgeeks.org/unique-paths-in-a-grid-with-obstacles/?ref=lbp
 */

// m & n are zero idx based
function uniquePath(arr: number[][], m: number, n: number): number {
    if (m < 0 || n < 0) return 0;
    if (m === 0 && n === 0) return 1;
    if (arr[m][n] === 1) return 0;

    return uniquePath(arr, m - 1, n) + uniquePath(arr, m, n - 1);
}

console.log(
    uniquePath(
        [
            [0, 0, 0],
            [0, 1, 0],
            [0, 0, 0],
        ],
        2,
        2
    )
);
