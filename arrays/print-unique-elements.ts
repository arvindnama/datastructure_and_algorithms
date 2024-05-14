function printUniqueElements(arr: number[]) : number[] {
  let map: {[key in number]: true} = {};
  for(let i = 0;i < arr.length;i++) {
    map[arr[i]] = true
  }
  return Object.keys(map).map(v => +v)
}

const arr = [12, 10, 9, 45, 2, 10, 10, 45];
console.log(arr);
console.log('unique elements', printUniqueElements(arr));
