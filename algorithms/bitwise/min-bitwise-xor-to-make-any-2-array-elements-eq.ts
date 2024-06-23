/**
 * Given an array arr[] of integers of size N and an integer K.
 * One can perform the Bitwise XOR operation between any array element and K any number of times.
 * The task is to print the minimum number of such operations required to make any two elements of the array equal.
 * If it is not possible to make any two elements of the array equal after performing the above-mentioned operation then print -1.
 *
 * NOTE: (x ^ k) = y , then (y ^ k) = x
 *
 * No matter how many times an element is XORd the cycle repeats. Hence one time conversion of element is max we need to perform
 *
 * Possible outcomes
 * -1 --> not found
 * 0 ---> no conversion needed
 * 1 ---> 1 conversion needed
 * 2 ---> 2 item conversion needed
 */

const findMaxXorOp = (arr: number[], k: number): number => {
    const sortedArr = arr.sort();
    const zeroConversionMatchFound = sortedArr.some(
        (a, i) => a === sortedArr[i + 1]
    );

    if (zeroConversionMatchFound) return 0;

    const map: { [k in number]: number } = {};
    for (let i = 0; i < arr.length; i++) {
        const xorV = arr[i] ^ k;
        const foundInArr = arr.findIndex((a, j) => j !== i && a === xorV) >= 0;
        if (foundInArr) return 1;
        if (map[xorV] >= 0) return 2;
        map[xorV] = i;
    }

    return -1;
};

let [arr, k] = [[1, 9, 4, 3], 3];
console.log(
    'Min Bitwise XOR need to make 2 items same,',
    arr,
    k,
    '::',
    findMaxXorOp(arr, k)
);
[arr, k] = [[13, 13, 21, 15], 13];
console.log(
    'Min Bitwise XOR need to make 2 items same,',
    arr,
    k,
    '::',
    findMaxXorOp(arr, k)
);

[arr, k] = [[1, 9, 5, 3], 4];
console.log(
    'Min Bitwise XOR need to make 2 items same,',
    arr,
    k,
    '::',
    findMaxXorOp(arr, k)
);
