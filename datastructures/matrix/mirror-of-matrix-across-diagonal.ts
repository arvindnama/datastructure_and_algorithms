/**
 * Given a 2-D array of order N x N, print a matrix that is the mirror of the given tree across the diagonal. We need to print the result in a way: swap the values of the triangle above the diagonal with the values of the triangle below it like a mirror image swap. Print the 2-D array obtained in a matrix layout.
 */

import { Coordinates, Matrix } from '../../models/matrix.models';

function swapAcrossDiagonal(matrix: Matrix) {
    const swap = ([ax, ay]: Coordinates, [bx, by]: Coordinates) => {
        const temp = matrix[ax][ay];
        matrix[ax][ay] = matrix[bx][by];
        matrix[bx][by] = temp;
    };

    const n = matrix.length - 1;
    for (let i = 0; i <= n; i++) {
        for (let j = i + 1; j <= n; j++) {
            swap([i, j], [j, i]);
        }
    }
    return matrix;
}

const matrix = [
    [1, 2, 4],
    [5, 9, 0],
    [3, 1, 7],
];

console.log('swap around diagonal', swapAcrossDiagonal(matrix));

const matrix2 = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
];

console.log('swap around diagonal', swapAcrossDiagonal(matrix2));
