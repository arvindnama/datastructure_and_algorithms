/**
 * Given an array arr and a function fn, return a sorted array sortedArr. You can assume fn only returns numbers and those numbers determine the sort order of sortedArr. sortedArray must be sorted in ascending order by fn output.

You may assume that fn will never duplicate numbers for a given array.
 */

import { JSONValue } from '../../../../models/leet-code.models';

type Fn = (value: JSONValue) => number;

function sortBy(arr: JSONValue[], fn: Fn): JSONValue[] {
    return arr.sort((a: JSONValue, b: JSONValue) => fn(a) - fn(b));
}

console.log(sortBy([5, 4, 1, 2, 3], (x) => x as number));
console.log(
    sortBy(
        [{ x: 1 }, { x: 0 }, { x: -1 }],
        (x) => (x as { [key: string]: JSONValue }).x as number
    )
);
console.log(
    sortBy(
        [
            [3, 4],
            [5, 2],
            [10, 1],
        ],
        (x) => (x as Array<number>)[1] as number
    )
);
