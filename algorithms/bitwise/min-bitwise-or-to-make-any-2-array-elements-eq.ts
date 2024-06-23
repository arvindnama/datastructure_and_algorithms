/**
 * Given an array arr[] of integers and an integer K,
 *  we can perform the Bitwise OR operation between any array element and K any number of times.
 * The task is to print the minimum number of such operations required to make any two elements of the array equal.
 * If it is not possible to make any two elements of the array equal after performing the above-mentioned operation then print -1.
 *
 *
 *  if (x | k) === y
 *  then (y| k) === y
 *  So no matter how many time you OR with k answer will remain same.
 *
 * So the maximum possible OR that can result is answer is 2 .
 * i.e. - 1 --> not possible
 *  0 --> no OR operation needed to get a match  i.e if a[i] === a[j] (i != j)
 *  1 --> one item is OR with k to get a match i.e a[i] == a|k[j] (i != j)
 *  2 ---> two items are OR with k to get a match a|k[i] == a|k[j] (i != j)
 */

const findMinOROp = (arr: number[], k: number): number => {
    const mapOfArrayToIndex: { [k in number]: number } = {};

    const arrayOrK: number[] = [];
    const mapOfArrayItemORkToIndex: { [k in number]: number } = {};

    for (let i = 0; i < arr.length; i++) {
        mapOfArrayToIndex[arr[i]] = i;
        const arrOrK = arr[i] | k;
        arrayOrK[i] = arrOrK;
        mapOfArrayItemORkToIndex[arrOrK] = i;
    }

    const foundWithoutConversion = arr.some(
        (a, i) => mapOfArrayToIndex[a] >= 0 && mapOfArrayToIndex[a] !== i
    );

    if (foundWithoutConversion) {
        return 0;
    }

    const foundWithoutOneConversion = arrayOrK.some(
        (a, i) => mapOfArrayToIndex[a] >= 0 && mapOfArrayToIndex[a] !== i
    );

    if (foundWithoutOneConversion) {
        return 1;
    }

    const foundWithTwoConversions = arrayOrK.some(
        (a, i) =>
            mapOfArrayItemORkToIndex[a] >= 0 &&
            mapOfArrayItemORkToIndex[a] !== i
    );

    if (foundWithTwoConversions) {
        return 2;
    }

    return -1;
};

let [arr, k] = [[1, 9, 4, 3], 3];
console.log(
    'Min Bitwise OR need to make 2 items same,',
    arr,
    k,
    '::',
    findMinOROp(arr, k)
);

[arr, k] = [[3, 9, 4, 3], 3];
console.log(
    'Min Bitwise OR need to make 2 items same,',
    arr,
    k,
    '::',
    findMinOROp(arr, k)
);

[arr, k] = [[13, 26, 21, 15], 13];
console.log(
    'Min Bitwise OR need to make 2 items same,',
    arr,
    k,
    '::',
    findMinOROp(arr, k)
);

[arr, k] = [[5, 9, 4, 3], 4];
console.log(
    'Min Bitwise OR need to make 2 items same,',
    arr,
    k,
    '::',
    findMinOROp(arr, k)
);
