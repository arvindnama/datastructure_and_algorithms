/**
 * Given a square matrix mat[][] and a number k. The task is to shift the first k elements of each row to the right of the matrix.
 */

function shiftElementsRowWise(matrix: number[][], k: number) {

  matrix.forEach(row => {
    const temp = row.slice(0, k);
    for(let i = 0, j=k; j < row.length; i++, j++) {
      row[i] = row[j]
    }
    for(let i = k, j= 0; i< row.length; i++,j++) {
      row[i] = temp[j]
    }
  });
  return matrix;
}

const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

console.log('shift Elements by 2',shiftElementsRowWise(matrix, 2))

const matrix2 = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
];

console.log('shift Elements by 2',shiftElementsRowWise(matrix2, 2))