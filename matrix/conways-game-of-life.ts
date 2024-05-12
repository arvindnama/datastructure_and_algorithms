/**
 * Initially, there is a grid with some cells which may be alive or dead. Our task is to generate the next generation of cells based on the following rules: 

Any live cell with fewer than two live neighbors dies as if caused by underpopulation.
Any live cell with two or three live neighbors lives on to the next generation.
Any live cell with more than three live neighbors dies, as if by overpopulation.
Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
 */

import { Coordinates, Matrix } from "./helpers/models";


function conwaysGame(matrix: Matrix) {

  const getCell = ([x,y]: Coordinates): number => matrix[x]?.[y] ?? 0;
  
  const flip = ([i,j]: Coordinates) => matrix[i][j] = 1 - matrix[i][j];

  const getSumNeighbors = ([x,y]: Coordinates): number => {
    return (
      getCell([x-1, y-1]) +
      getCell([x-1, y]) +
      getCell([x-1, y+1]) +
     
      getCell([x, y-1]) + 
      getCell([x, y+1]) +

      getCell([x+1, y-1]) +
      getCell([x+1, y]) +
      getCell([x+1, y+1]) 
    );
  }

  const canDie = ([x,y]: Coordinates): boolean => {
    const sum = getSumNeighbors([x, y]);
    return sum < 2 || sum > 3
  }

  const canReproduce = ([x,y]: Coordinates): boolean => {
    const sum = getSumNeighbors([x, y]);
    return sum === 3
  }

  for(let i = 0; i < matrix.length; i++){
    for(let j = 0; j < matrix[i].length; j++){
      const cell = matrix[i][j]

      if(cell === 0 && canReproduce([i,j])) flip([i,j])
      if(cell === 1 && canDie([i,j])) flip([i,j])
    }
  }


  return matrix;
}

const land =[
  [0,0,1,0,0],
  [0,0,1,0,0],
  [0,0,0,0,0],
  [0,0,1,1,0],
  [0,1,1,0,0],
  [0,0,0,0,0],
]

console.log('land', land)
console.log('conway\'s game', conwaysGame(land));