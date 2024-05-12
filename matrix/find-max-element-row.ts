/**
 * Given a matrix, the task is to find the maximum element of each row.
 */


function maxElementInRow(matrix: number[][]) {
  const maxElements: number[] = [];
  matrix.forEach(row => {
     const max = row.reduce((acc, cur) => Math.max(cur, acc), -1);
     maxElements.push(max);
  })
  return maxElements;
}

const matrix = [
  [1, 2, 3],
  [1, 4, 9],
  [76, 34, 21]
]
console.log('Max Element in Row', maxElementInRow(matrix))