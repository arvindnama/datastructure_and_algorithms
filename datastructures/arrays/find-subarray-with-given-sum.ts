
function findSubArrayWithGivenSum(arr: number[], sum: number): [number, number] | null {

  for(let i = 0; i < arr.length; i++){
    let tempSum = arr[i];
    let j = i+1;
    for(; j < arr.length; j++) {
      tempSum += arr[j];
      if (tempSum >= sum) {
        break;
      }
    }
    if(tempSum === sum) return [i, j] 
  }
  return null;
}

let arr = [1,4,20,3,10,5];
console.log('Sub array matching sum');
console.log(findSubArrayWithGivenSum(arr, 33));

arr = [1,4,0,0,3,10,5];
console.log('Sub array matching sum')
console.log(findSubArrayWithGivenSum(arr,7))

arr = [1,4];
console.log('Sub array matching sum')
console.log(findSubArrayWithGivenSum(arr,0))