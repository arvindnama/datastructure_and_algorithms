

function rearrange(arr: number[]): number[] {
  const res = [];
  let startPtr = 0;
  let endPtr = arr.length - 1;
  arr.sort();

  for(let i = 0; i<= arr.length -1 ; i++) {
    if(i % 2 == 0){
      res[i] = arr[endPtr--];
    } else {
      res[i] = arr[startPtr++];
    }
  }
  return res;
}


let arr = [1,2,2,1];
console.log(arr);
console.log('Rearrange even pos greater than odd pos', rearrange(arr));

arr = [1,3,2];
console.log(arr);
console.log('Rearrange even pos greater than odd pos', rearrange(arr));