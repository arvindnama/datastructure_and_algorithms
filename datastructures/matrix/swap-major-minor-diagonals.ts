/**
 * Given a square matrix, swap the element of major and minor
 */

import { Matrix, Coordinates } from "../../models/matrix.models";

function swapDiagonals(matrix: Matrix) {

  const swap = ([ax, ay]: Coordinates, [bx, by]: Coordinates) => {
    const temp = matrix[ax][ay];
    matrix[ax][ay] = matrix[bx][by];
    matrix[bx][by] = temp;
  }

  const n = matrix.length - 1;
  let [ax,ay]: Coordinates = [0,0];
  let [bx,by]: Coordinates = [0,n];
  let [cx,cy]: Coordinates = [n,n];
  let [dx,dy]: Coordinates = [n,0];

  while(ax < cx && by > dy){
    swap([ax,ay], [bx,by]);
    swap([cx,cy], [dx,dy]);
    ax++; ay++;
    bx++; by--;
    cx--; cy--;
    dx--; dy++;
  }

  return matrix;
}

const matrix = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
]
console.log('swap diagonals', swapDiagonals(matrix));

const matrix2 = [
  [0,  1,  2,  9],
  [3,  4,  5,  10],
  [6,  7,  8,  11],
  [12, 13, 14, 15],
]
console.log('swap diagonals', swapDiagonals(matrix2));