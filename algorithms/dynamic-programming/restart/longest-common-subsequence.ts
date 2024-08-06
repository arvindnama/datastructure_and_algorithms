/**
 * Given two strings, S1 and S2, the task is to find the length of the Longest Common Subsequence, i.e. longest subsequence present in both of the strings.
 * https://www.geeksforgeeks.org/longest-common-subsequence-dp-4/?ref=lbp
 */

function findLongestCommonSubsequence(s1: string, s2: string): number {
    const find = (s1Idx: number, s2Idx: number): number => {
        if (s1Idx < 0 || s2Idx < 0) return 0;

        if (s1[s1Idx] === s2[s2Idx]) return 1 + find(s1Idx - 1, s2Idx - 1);

        return Math.max(find(s1Idx - 1, s2Idx), find(s1Idx, s2Idx - 1));
    };

    return find(s1.length - 1, s2.length - 1);
}

console.log(findLongestCommonSubsequence('ABC', 'ACD'));
console.log(findLongestCommonSubsequence('AGGTAB', 'GXTXAYB'));
console.log(findLongestCommonSubsequence('ABC', 'CBA'));
console.log(findLongestCommonSubsequence('XYZW', 'XYWZ'));
