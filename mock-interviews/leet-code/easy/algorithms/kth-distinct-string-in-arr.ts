/**
 * A distinct string is a string that is present only once in an array.

Given an array of strings arr, and an integer k, return the kth distinct string present in arr. If there are fewer than k distinct strings, return an empty string "".

Note that the strings are considered in the order in which they appear in the array.


 */

function kthDistinct(arr: string[], k: number): string {
    const map: {
        [k in string]: { idx: number; count: number; string: string };
    } = {};

    for (let idx = 0; idx < arr.length; idx++) {
        const a = arr[idx];
        map[a] = map[a] || { idx: Infinity, count: 0, string: a };
        map[a].count++;
        map[a].idx = Math.min(map[a].idx, idx);
    }

    const values = Object.values(map)
        .sort((a, b) => a.idx - b.idx)
        .filter((a) => a.count === 1);

    return values.length < k ? '' : values[k - 1].string;
}

console.log(kthDistinct(['d', 'b', 'c', 'b', 'c', 'a', 'a'], 2));
