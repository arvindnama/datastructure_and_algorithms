/**
 * Given two strings, S1 and S2, the task is to find the length of the Longest Common Subsequence, i.e. longest subsequence present in both of the strings.
 *
 *
 * given 2 strings S1 & S2 m & n last char position of s1 & s2.. start from
 * last position .
 *  there are 2 possibilities
 *  1. both chars are same,
 *    Here we increment the LCS count by one and recursively call the function for m-1 & n-1 chars
 *  2. both chars are not same
 *    Here we can do 2 things.
 *      2.a ignore s1 char and proceed to next (to find the sub sequence)
 *              m - 1 , n
 *      2.b ignore s2 char and proceed next
 *              m , n - 1
 *      return  maximum of 2.a & 2.b
 *
 */

// m & n are 1 based (not 0 based ) indexes
const lcs = (s1: string, s2: string, m: number, n: number): number => {
    if (m == 0 || n === 0) return 0;

    const map = ((lcs as any as FuncWithMap).map =
        (lcs as any as FuncWithMap).map || {});

    if (typeof map[`${m}_${n}`] === 'number') return map[`${m}_${n}`] as number;

    if (s1[m - 1] === s2[n - 1])
        return (map[`${m}_${n}`] = 1 + lcs(s1, s2, m - 1, n - 1));

    return (map[`${m}_${n}`] = Math.max(
        lcs(s1, s2, m - 1, n),
        lcs(s1, s2, m, n - 1)
    ));
};

let [s1, s2] = ['ABC', 'ADC'];
console.log(
    'Longest common substring of ',
    s1,
    s2,
    lcs(s1, s2, s1.length, s2.length)
);

[s1, s2] = ['AGGTAB', 'GXTXAYB'];
console.log(
    'Longest common substring of ',
    s1,
    s2,
    lcs(s1, s2, s1.length, s2.length)
);

[s1, s2] = ['XYZW', 'XYWZ'];
console.log(
    'Longest common substring of ',
    s1,
    s2,
    lcs(s1, s2, s1.length, s2.length)
);
[s1, s2] = ['AXYT', 'AYZX'];
console.log(
    'Longest common substring of ',
    s1,
    s2,
    lcs(s1, s2, s1.length, s2.length)
);
