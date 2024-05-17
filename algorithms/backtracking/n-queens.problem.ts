/**
 * The N Queen is the problem of placing N chess queens on an N×N chessboard so that no two queens attack each other.
 */

import { Coordinates, Matrix } from "../../models/matrix.models";

function placeNQueens(n: number): Matrix {
  const board: Matrix = Array(n).fill([]).map(()=> Array(n).fill(0));


  const canPlace = ([x,y]: Coordinates):boolean => {
    // check left of row is queen is present 

    for(let i = 0; i< y; i++) {
      if(board[x][i] === 1) return false
    }

    // check left upper diagonal if any queen is already present

    for(let i=x, j = y; i >=0 && j >=0; i--,j--) {
      if(board[i][j] === 1) return false
    }
    // check left lower diagonal if any queen is already present

    for(let i = x , j = y; i < n && j >=0; i++, j--) {
      if(board[i][j] === 1) return false
    }

    return true;
  };

  const placeQueen = (col: number): boolean => {

    if(col === n) return true; // successfully placed all queens

    for(let i = 0 ; i < n ; i++) {
      if(canPlace([i,col])) {
        board[i][col] = 1;
        if(placeQueen(col + 1)){
          return true;
        }
        board[i][col] = 0; // backtrack
      }
    }
    return false;
  }
  
  placeQueen(0);
  return board;

}

console.log('Solve 4 queen problem');
console.log(placeNQueens(4))

console.log('Solve 8 queen problem');
console.log(placeNQueens(8))