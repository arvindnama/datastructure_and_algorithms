/**
 * Given a set[] of non-negative integers and a value sum, the task is to print the subset of the given set whose sum is equal to the given sum.
 */

const subsetProblem = (set: number[], sum: number): Array<number[]> => {
    const res: Array<number[]> = [];

    const solve = (idx: number, sum: number, subset: number[]) => {
        if (sum === 0) {
            res.push(subset);
            return;
        }
        if (idx === set.length || sum < 0) return; // reached end

        solve(idx + 1, sum - set[idx], [...subset, set[idx]]);
        solve(idx + 1, sum, subset);
    };
    solve(0, sum, []);
    return res;
};

console.log(subsetProblem([1, 2, 1], 3));
console.log(subsetProblem([3, 34, 4, 12, 5, 2], 30));
