/**
 * You are given two strings s and t such that every character occurs at most once in s and t is a permutation of s.

The permutation difference between s and t is defined as the sum of the absolute difference between the index of the occurrence of each character in s and the index of the occurrence of the same character in t.

Return the permutation difference between s and t
 */

function findPermutationDifference(s: string, t: string): number {
    const map: { [k in string]: [number, number] } = {};
    for (let i = 0; i < s.length; i++) {
        const si = s[i];
        const ti = t[i];

        map[si] = map[si] || [];
        map[ti] = map[ti] || [];
        map[si][0] = i;
        map[ti][1] = i;
    }

    return Object.values(map).reduce((acc, [si, ti]) => {
        return acc + Math.abs(si - ti);
    }, 0);
}

console.log(findPermutationDifference('abc', 'bac'));
console.log(findPermutationDifference('abc', 'abc'));
console.log(findPermutationDifference('abcde', 'edbac'));
