/**
 * Given an m x n matrix, return all elements of the matrix in spiral order
 */

function spiralOrder(matrix: number[][]): number[] {
    /**
     * print the outer matrix first
     * reduce the matrix size and repeat
     *
     * 4 pointers ;
     *
     *  topLeft , topRight
     *  bottomLeft, bottomRight
     *
     *
     * topLeft --> topRight
     * topRight --> bottomRight
     * bottomRight ---> bottomLeft
     * bottomLeft ---> topLeft
     *      l     r
     *      00 01 02
     *      10 11 12
     *    b 20 21 22
     *
     */

    let [left, right] = [0, matrix[0].length - 1];
    let [top, bottom] = [0, matrix.length - 1];

    const res: number[] = [];
    while (left <= right && top <= bottom) {
        for (let i = left; i <= right; i++) res.push(matrix[left][i]);
        for (let i = top + 1; i < bottom; i++) res.push(matrix[i][right]);
        if (top !== bottom) {
            for (let i = right; i > left; i--) res.push(matrix[bottom][i]);
            for (let i = bottom; i > top; i--) res.push(matrix[i][left]);
        }
        left++;
        right--;
        top++;
        bottom--;
    }

    return res;
}

console.log(
    spiralOrder([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
    ])
);

console.log(
    spiralOrder([
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
    ])
);

console.log(spiralOrder([[3], [2]]));
console.log(spiralOrder([[6, 9, 7]]));
