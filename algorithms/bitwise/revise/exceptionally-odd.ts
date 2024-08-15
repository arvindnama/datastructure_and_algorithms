/**
 * Given an array of N positive integers where all numbers occur even number of times except one number which occurs odd number of times. Find the exceptional number.
 */

const find = (arr: number[]): number => {
    const hash: { [k in number]: number } = {};
    for (let i = 0; i < arr.length; i++) {
        hash[arr[i]] = hash[arr[i]] || 0;
        hash[arr[i]]++;
    }
    return Object.keys(hash).reduce((acc, key) => {
        if (hash[parseInt(key)] % 2 !== 0) return parseInt(key);
        return acc;
    }, -1);
};

console.log(find([1, 2, 3, 2, 3, 1, 3]));
console.log(find([5, 7, 2, 7, 5, 2, 5]));
