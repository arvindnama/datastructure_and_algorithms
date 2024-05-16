/**
 * Given a 2D array, print it in spiral form.
 */


function printSpiralMatrix(matrix: number[][]) {

  const printOuterBoundary = (
    [ax,ay]:[number, number], 
    [bx,by]:[number, number], 
    [cx,cy]:[number, number], 
    [dx,dy]:[number, number] 
  ) =>  {
    const path = [];
    for(let i = ay; i < by; i++) {
      path.push(matrix[ax][i]);
    }

    for(let i = bx; i < cx; i++) {
      path.push(matrix[i][by]);
    }

    for(let i = cy; i > dy; i--) {
      path.push(matrix[cx][i]);
    }

    for(let i = dx; i > ax; i--) {
      path.push(matrix[i][ay]);
    }
    return path;
  }

  let a:[number, number] = [0,0];
  let b:[number, number] = [0, matrix[0].length -1];
  let d:[number, number] = [matrix.length -1, 0];
  let c:[number, number] = [matrix.length -1, matrix[matrix.length -1].length - 1];
  let fullPath: number[] = [];

  let i = 0;
  while(a[1] <= b[1] && a[0] <= d[0]){
    const path = printOuterBoundary(a,b,c,d);
    fullPath = [...fullPath, ...path];
    a[0]++;
    a[1]++;
    b[0]++;
    b[1]--;
    c[0]--;
    c[1]--;
    d[0]--;
    d[1]++;

  }
  console.log(fullPath.join())
}

let matrix = [
  [1,2,3,4],
  [5,6,7,8],
  [9,10,11,12],
  [13,14,15,16]
];

console.log(matrix)
console.log(printSpiralMatrix(matrix));


matrix = [
  [1,2,3,4],
  [5,6,7,8]
];

console.log(matrix)
console.log(printSpiralMatrix(matrix));

matrix = [
  [1,2,3,4],
  [5,6,7,8],
  [9,10,11,12]
];

console.log(matrix)
console.log(printSpiralMatrix(matrix));