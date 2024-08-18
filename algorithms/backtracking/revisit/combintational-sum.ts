/**
 * Given an array of positive integers arr[] and an integer x, The task is to find all unique combinations in arr[] where the sum is equal to x.
The same repeated number may be chosen from arr[] an unlimited number of times.

Elements in a combination (a1, a2, …, ak) must be printed in non-descending order. (ie, a1 <= a2 <= … <= ak). If there is no combination possible print “Empty”.
 */

const combinationalSum = (arr: number[], x: number): number[][] => {
    arr.sort((a, b) => a - b);

    const res: Array<number[]> = [];

    const solve = (idx: number, s: number[], sum: number) => {
        if (idx >= arr.length || sum > x) return;
        if (sum === x) {
            res.push(s);
            return;
        }
        solve(idx, [...s, arr[idx]], sum + arr[idx]);
        solve(idx + 1, s, sum);
    };
    solve(0, [], 0);
    return res;
};

console.log(combinationalSum([2, 4, 6, 8], 8));
