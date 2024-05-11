/**
 * Given a n x n matrix. The problem is to find all the distinct elements common to all rows of the matrix. The elements can be printed in any order.
 */


function commonToAllRows(matrix: number[][]) {
  const data: {[key in number]: number[]} = {};

  for(let i = 0; i <= matrix.length -1; i++){
    for(let j = 0; j <= matrix[i].length -1; j++){
      const e = matrix[i][j];
      data[e] = data[e] || [];
      if(!data[e].find((a => a === i))) data[e].push(i);
    }
  }

  return Object.keys(data).filter((key) => data[+key].length === matrix.length).join(',');
}

let matrix = [
  [2,1,4,3],
  [1,2,3,2],
  [3,6,2,3],
  [5,2,5,3],
]

console.log(matrix);
console.log('distinct elements common to all rows', commonToAllRows(matrix));
