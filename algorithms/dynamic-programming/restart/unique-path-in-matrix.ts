/**
 * The problem is to count all unique possible paths from the top left to the bottom right of a M X N matrix with the constraints that from each cell you can either move only to the right or down
 *
 * https://www.geeksforgeeks.org/count-possible-paths-top-left-bottom-right-nxm-matrix/?ref=lbp
 */

function uniquePath(m: number, n: number): number {
    if (m <= 0 || n <= 0) return 0;
    if (m === 1 && n === 1) return 1;
    return uniquePath(m - 1, n) + uniquePath(m, n - 1);
}

console.log(uniquePath(2, 2));
console.log(uniquePath(3, 3));
console.log(uniquePath(3, 2));
