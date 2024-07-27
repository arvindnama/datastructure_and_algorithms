/**
 * Write code that enhances all arrays such that you can call the snail(rowsCount, colsCount) method that transforms the 1D array into a 2D array organised in the pattern known as snail traversal order. Invalid input values should output an empty array. If rowsCount * colsCount !== nums.length, the input is considered invalid.

Snail traversal order starts at the top left cell with the first value of the current array. It then moves through the entire first column from top to bottom, followed by moving to the next column on the right and traversing it from bottom to top. This pattern continues, alternating the direction of traversal with each column, until the entire current array is covered. For example, when given the input array [19, 10, 3, 7, 9, 8, 5, 2, 1, 17, 16, 14, 12, 18, 6, 13, 11, 20, 4, 15] with rowsCount = 5 and colsCount = 4, the desired output matrix is shown below. Note that iterating the matrix following the arrows corresponds to the order of numbers in the original array.
 */

declare global {
    interface Array<T> {
        snail(rowsCount: number, colsCount: number): T[][];
    }
}

Array.prototype.snail = function <T>(
    rowsCount: number,
    colsCount: number
): T[][] {
    if (this.length !== rowsCount * colsCount) return [];

    const arr: T[][] = [];
    let k = 0;
    let down = true;
    for (let c = 0; c < colsCount; c++) {
        for (let r = 0; r < rowsCount; r++, k++) {
            const rIdx = down ? r : rowsCount - 1 - r;
            const cIdx = c;
            arr[rIdx] = arr[rIdx] || [];
            arr[rIdx][cIdx] = this[k];
        }
        down = !down;
    }
    return arr;
};

let arr = [
    19, 10, 3, 7, 9, 8, 5, 2, 1, 17, 16, 14, 12, 18, 6, 13, 11, 20, 4, 15,
];
console.log(arr.snail(5, 4));

arr = [1, 2, 3, 4];
console.log(arr.snail(1, 4));

arr = [1, 3];
console.log(arr.snail(2, 2));
