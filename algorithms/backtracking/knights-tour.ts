/**
 * Given a N*N board with the Knight placed on the first block of an empty board. Moving according to the rules of chess knight must visit each square exactly once. Print the order of each cell in which they are visited
 */

import { Coordinates, Matrix } from "../../models/matrix.models";

function knightTour(n: number): Nullable<number[][]> {
  const visited: Matrix = Array(n).fill([]).map((_) => Array(n).fill(-1));

   const possibleMoves: Coordinates[] = [
    [-1, -2], [-1, 2],
    [1, -2], [1, 2],
    [-2, -1], [-2, 1],
    [2, -1], [2, 1],
  ];

  const canMove = ([x, y]: Coordinates) => x >=0 && y >=0 && x < n && y < n && visited[x][y] === -1;

  const traverse = ([sx,sy]: Coordinates, move: number):boolean  => {
    if(move === n * n ) {
      return true;
    }

    for(let i = 0 ; i < possibleMoves.length; i++) {
      const [px,py] = possibleMoves[i];
      const [nx, ny] = [sx+px, sy+py];
      if(canMove([nx,ny])){
        visited[nx][ny] = move;
        if(traverse([nx,ny], move+1)){
          return true
        }else{
          visited[nx][ny] = -1;
        }
      }
    }
    return false;
  }

  visited[0][0] = 0;
  return traverse([0,0], 1) ? visited : null;
}

console.log('knights tour');
console.log(knightTour(8))