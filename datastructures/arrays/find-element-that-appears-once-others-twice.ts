

/**
 * 
 * Xor of 2 same numbers will result in zero 
 * Hence Xor all elements in array and it will return that element which is only present once.
 * 
 * arr = [7,3,5,3,5];
 * res = 7 ^ 3 ^ 5 ^ 3 ^ 5 = 7 ^ (3 ^ 3) ^ (5 ^ 5)  = 7 ^ 0 ^ 0  = 7
 */
function findElement(arr: number[]): number {

  let res = arr[0];
  for (let i = 1 ; i < arr.length; i++ ) {
    res = res ^ arr[i];
  }
  return res;
}


console.log(findElement([7,3,5,3,5,6,7,2,6]));