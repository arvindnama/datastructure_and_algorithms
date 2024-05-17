/**
 * Write a program to print all the LEADERS in the array. An element is a leader if it is greater than all the elements to its right side. And the rightmost element is always a leader.
 */

function printLeaders(arr: number[]): number[] {
    const res = [];
    for (let i = 0; i < arr.length; i++) {
        let isLeader = true;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] < arr[j]) {
                isLeader = false;
                break;
            }
        }
        if (isLeader) res.push(arr[i]);
    }
    return res;
}

let arr = [16, 17, 4, 3, 5, 2];
console.log('print leaders', arr);
console.log(printLeaders(arr));

arr = [1, 2, 3, 4, 5, 2];
console.log('print leaders', arr);
console.log(printLeaders(arr));
