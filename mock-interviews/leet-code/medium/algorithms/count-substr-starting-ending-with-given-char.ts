/**
 * You are given a string s and a character c. Return the total number of
substrings
 of s that start and end with c.
 */

function countSubstrings(s: string, c: string): number {
    /**
     * for every substring check if start & ends with c
     */

    let count = 0;
    for (let i = 0; i < s.length; i++) {
        if (s[i] !== c) continue;
        count++; // starting and ending with c
        for (let j = i + 1; j < s.length; j++) {
            if (s[j] === c) count++;
        }
    }

    return count;
}

console.log(countSubstrings('abada', 'a'));
console.log(countSubstrings('zzz', 'z'));
