/**
 * Given an integer numRows, return the first numRows of Pascal's triangle.

In Pascal's triangle, each number is the sum of the two numbers directly above it as shown:
 */

function generate(numRows: number): number[][] {
    const row1 = [1];
    const row2 = [1, 1];

    if (numRows == 1) return [row1];
    if (numRows == 2) return [row1, row2];

    const res = [row1, row2];

    for (let i = 2; i < numRows; i++) {
        const prevRow = res[i - 1];
        const nextRow = [];

        const noOfElementInNextRow = i + 1;
        // 1st and last are always 1
        nextRow[0] = 1;
        nextRow[noOfElementInNextRow - 1] = 1;
        // fill in remaining cells
        for (let j = 1; j < noOfElementInNextRow - 1; j++) {
            nextRow[j] = prevRow[j - 1] + prevRow[j];
        }
        res.push(nextRow);
    }
    return res;
}

console.log(generate(6));
