/**
 * Given an array arr of size n−1 that contains distinct integers in the range of 1 to n (inclusive), find the missing element. The array is a permutation of size n with one element missing. Return the missing element.
 */

const missingElementInArr = (arr: number[], n: number): number => {
    let [total, arrTotal] = [0, 0];
    for (let i = 0; i < arr.length; i++) {
        arrTotal += arr[i];
        total += i + 1;
    }
    total += n;
    return total - arrTotal;
};

console.log(missingElementInArr([1, 2, 3, 5], 5));
console.log(missingElementInArr([], 1));
