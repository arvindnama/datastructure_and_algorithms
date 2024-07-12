/**
 * Given an integer rowIndex, return the rowIndexth (0-indexed) row of the Pascal's
 * triangle

 */

function getRow(rowIndex: number): number[] {
    if (rowIndex === 0) return [1];
    if (rowIndex === 1) return [1, 1];

    let cur = [1, 1];
    let next = [];
    for (let i = 2; i <= rowIndex; i++) {
        const totalNoInNext = i + 1;
        next[0] = 1;
        next[totalNoInNext - 1] = 1;
        for (let k = 1; k < totalNoInNext - 1; k++) {
            next[k] = cur[k - 1] + cur[k];
        }
        cur = next;
        next = [];
    }
    return cur;
}

console.log(getRow(0));
console.log(getRow(1));
console.log(getRow(2));
console.log(getRow(3));
console.log(getRow(4));
console.log(getRow(5));
console.log(getRow(6));
