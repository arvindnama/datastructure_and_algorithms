/**
 * Given an array A[] of n integers,
 * find out the number of ordered pairs such that Ai&Aj is zero, where 0<=(i,j)<n.
 * Consider (i, j) and (j, i) to be different
 */

const countPairs = (arr: number[]): number => {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (i !== j && (arr[i] & arr[j]) === 0) count++;
        }
    }
    return count;
};

console.log('Count no of pairs that & to zero', countPairs([3, 4, 2]));
console.log('Count no of pairs that & to zero', countPairs([5, 4, 1, 6]));
