/**
 * Given a matrix mat[][] having n rows and m columns. We need to find unique elements in matrix i.e, those elements which are not repeated in the matrix or those elements whose frequency is 1. 
 */


function findUniqueElements(matrix: number[][]) {
  const map: {[key in number]: number} = {};

  for(let i = 0; i < matrix.length;i++){
    for(let j = 0; j < matrix[i].length; j++) {
      map[matrix[i][j]] = map[matrix[i][j]] || 0;
      map[matrix[i][j]]++
    }
  }

  return Object.keys(map).filter(k => map[+k] === 1);
}

const matrix = [
  [20,  15,  30,  2],
  [2,   3,   5,   30],
  [6,   7,   6,   8],
]
console.log('Unique ELements in matrix', findUniqueElements(matrix).join())

