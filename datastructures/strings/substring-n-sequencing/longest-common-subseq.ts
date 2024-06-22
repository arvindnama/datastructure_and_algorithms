/**
 * Given two strings, S1 and S2, the task is to find the length of the Longest Common Subsequence, i.e. longest subsequence present in both of the strings.
 */

const lcs = (s1: string, s2: string): number => {
    if (!s1.length || !s2.length) return 0;

    if (s1[0] === s2[0]) return 1 + lcs(s1.substring(1), s2.substring(1));
    return Math.max(lcs(s1.substring(1), s2), lcs(s1, s2.substring(1)));
};

let [s1, s2] = ['ABC', 'ACD'];
console.log('LCM of', s1, s2, lcs(s1, s2));

[s1, s2] = ['AGGTAB', 'GXTXAYB'];
console.log('LCM of', s1, s2, lcs(s1, s2));

[s1, s2] = ['XYZW', 'XYWZ'];
console.log('Longest common substring of ', s1, s2, lcs(s1, s2));
[s1, s2] = ['AXYT', 'AYZX'];
console.log('Longest common substring of ', s1, s2, lcs(s1, s2));
