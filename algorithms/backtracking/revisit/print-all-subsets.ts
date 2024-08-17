/**
 * Given an array Arr[] of size N, print all the subsets of the array.

Subset: A subset of an array is a tuple that can be obtained from the array by removing some (possibly all) elements of it
 */

const printAllSubsets = (arr: number[]): number[][] => {
    const res: number[][] = [];
    const traverse = (subset: number[], idx: number) => {
        res.push(subset);

        for (let i = idx; i < arr.length; i++) {
            traverse([...subset, arr[i]], i + 1);
        }
    };

    traverse([], 0);
    return res;
};

console.log(printAllSubsets([1, 2, 3]));
console.log(printAllSubsets([2, 4]));
