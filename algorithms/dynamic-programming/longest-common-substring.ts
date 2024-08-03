/**
 *Given two strings ‘X’ and ‘Y’, find the length of longest common substring. * Expected space complexity is linear.
 *
 *    i
 *     G e e k s
 * j G 1
 *   e   2
 *   e     3
 *   k       4
 *   s         5
 */

// m & n are 1 based (not 0 based ) indexes
const lcs = (s1: string, s2: string): number => {
    const sizes: Array<number[]> = Array(s1.length)
        .fill(null)
        .map(() => []);

    let longest = 0;
    for (let i = 0; i < s1.length; i++) {
        for (let j = 0; j < s2.length; j++) {
            if (i === 0 || j === 0) sizes[i][j] = 1;
            else if (s1[i] == s2[j]) {
                sizes[i][j] = 1 + sizes[i - 1][j - 1];
                longest = Math.max(longest, sizes[i][j]);
            } else sizes[i][j] = 0;
        }
    }
    return longest;
};

let [s1, s2] = ['GeeksforGeeks', 'GeeksQuiz'];
console.log('Longest common substring of ', s1, s2, lcs(s1, s2));

[s1, s2] = ['OldSite:GeeksforGeeks.org', 'NewSite:GeeksQuiz.com'];
console.log('Longest common substring of ', s1, s2, lcs(s1, s2));
