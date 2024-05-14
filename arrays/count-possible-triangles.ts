function countTriangles(arr:number[]): [number[][], number] {
  const res: Array<number[]> = [];

  for(let i = 0; i < arr.length;i++) {
    for(let j = i+1; j< arr.length;j++){
      for(let k = j+1; k < arr.length; k++) {
        if(arr[i] + arr[j] > arr[k]){
          res.push([arr[i],arr[j], arr[k]])
        }
      }
    }
  }
  return [res, res.length];
}

let arr = [4,6,3,7];
console.log(arr);
console.log('Possible Triangles', countTriangles(arr));

arr = [10, 21, 22, 100, 101, 200, 300];
console.log(arr);
console.log('Possible Triangles', countTriangles(arr));