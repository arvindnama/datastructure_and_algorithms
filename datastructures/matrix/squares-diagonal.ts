/**
 * You have given an integer matrix with odd dimensions. Find the square of the diagonal elements on both sides.
 */

import { Matrix } from "../../models/matrix.models";

function findSqrOfDiagonals(matrix: Matrix) {

  const n = matrix.length - 1;
  let [ax, ay] = [0,0];
  let [bx, by] = [0,n];

  const diagonalSqr: number[][] = [[],[]];
  while(ax <= n && ay <= n && bx <= n && by >=0){
    diagonalSqr[0].push(Math.pow(matrix[ax][ay], 2));
    diagonalSqr[1].push(Math.pow(matrix[bx][by], 2));
    ax++; ay++;
    bx++; by--;
  }

  return diagonalSqr;
}

const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]

console.log('diagonal sqr', findSqrOfDiagonals(matrix));

const matrix2 = [
  [2, 5, 7],  
  [3, 7, 2],
  [5, 6, 9],
]

console.log('diagonal sqr', findSqrOfDiagonals(matrix2));