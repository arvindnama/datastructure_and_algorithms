/**
 * Given an array arr and a chunk size size, return a chunked array.

A chunked array contains the original elements in arr, but consists of subarrays each of length size. The length of the last subarray may be less than size if arr.length is not evenly divisible by size.

You may assume the array is the output of JSON.parse. In other words, it is valid JSON.

Please solve it without using lodash's _.chunk function.
 */

import { JSONValue } from '../../../../models/leet-code.models';

type Obj = Record<string, JSONValue> | Array<JSONValue>;

function chunk(arr: Obj[], size: number): Obj[][] {
    let i = 0;
    const res: Obj[][] = [];
    while (i < arr.length) {
        res.push(arr.slice(i, i + size));
        i += size;
    }

    return res;
}

console.log(chunk([1, 2, 3, 4, 5] as any, 1));
console.log(chunk([1, 2, 3, 4, 5] as any, 2));
