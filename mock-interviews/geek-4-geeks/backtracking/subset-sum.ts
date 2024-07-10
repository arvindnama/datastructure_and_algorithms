/**
 * Given a set[] of non-negative integers and a value sum, the task is to print the subset of the given set whose sum is equal to the given sum.
 */

function subsetSum(arr: number[], sum: number): number[][] {

    const subsets: number[][] = []
    const traverse = (idx: number) => {
        if(idx >= arr.length)  return;

        let tempSum = arr[idx], i = idx+ 1;
        for(; i < arr.length; i++) {
            tempSum += arr[i]
            if(tempSum >= sum) {
                break
            }
        }
        if(tempSum === sum) {
            subsets.push(arr.slice(idx, i + 1));
        }
        traverse(idx + 1);
    }
    traverse(0);
    return subsets;
}

let arr = [1,2,1]
console.log('subset matching sum', arr);
console.log(subsetSum(arr, 3));

 arr = [2, 28, 4, 12, 5, 2]
console.log('subset matching sum', arr);
console.log(subsetSum(arr, 30));

