/**
 * Given an array of integers of size ‘n’ and an integer ‘k’,
 * We can perform the Bitwise AND operation between any array element and ‘k’ any number of
 * times.
 * The task is to print the minimum number of such operations required to make any two
 * elements of the array equal.
 * If it is not possible to make any two elements of the array equal after performing the
 * above mentioned operation then print ‘-1’.
 *
 *
 *  (x & k) = y , Then ( y & k ) = y
 *
 * one max conversion is sufficient.
 *
 * There are 4 possible outputs
 * 0-> no conversion , where there is a duplicate in array
 * 1-> convert one of the item will match another unconverted item
 * 2 -> 2 item converted result to be same.
 * -1 --> not possible
 */

const minAndOp = (arr: number[], k: number): number => {
    if (arr.sort().some((a, i) => a === arr[i - 1])) return 0;

    const map: { [k in number]: number } = {};
    for (let i = 0; i < arr.length; i++) {
        const op = arr[i] & k;
        if (arr.findIndex((a, j) => i !== j && a === op) >= 0) return 1;

        if (map[op] >= 0) return 2;
        map[op] = i;
    }

    return -1;
};

let [arr, k] = [[1, 2, 1, 2], 6];
console.log(
    'Min Bitwise AND need to make 2 items same,',
    arr,
    k,
    '::',
    minAndOp(arr, k)
);

[arr, k] = [[5, 6, 2, 4], 2];
console.log(
    'Min Bitwise AND need to make 2 items same,',
    arr,
    k,
    '::',
    minAndOp(arr, k)
);

[arr, k] = [[1, 2, 3], 15];
console.log(
    'Min Bitwise AND need to make 2 items same,',
    arr,
    k,
    '::',
    minAndOp(arr, k)
);
