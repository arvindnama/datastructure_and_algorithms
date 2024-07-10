/**
 * Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.
 */

function strStr(haystack: string, needle: string): number {
    let [i, j] = [0, 0];

    while (i < haystack.length && j < needle.length) {
        if (haystack[i] === needle[j]) {
            j++;
        } else {
            i = i - j;
            j = 0;
        }
        i++;
    }

    return j === needle.length ? i - needle.length : -1;
}

let haystack = 'sadbutsad';
let needle = 'sad';

console.log(strStr(haystack, needle));

haystack = 'leetcode';
needle = 'leeto';
console.log(strStr(haystack, needle));

haystack = 'mississippi';
needle = 'issip';
console.log(strStr(haystack, needle));
