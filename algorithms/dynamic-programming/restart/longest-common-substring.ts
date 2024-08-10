/**
 * Given two strings ‘X’ and ‘Y’, find the length of the longest common substring
 * https://www.geeksforgeeks.org/longest-common-substring-space-optimized-dp-solution/?ref=lbp
 *     i
 *     G e e k s
 *j G  1 1 1 1 1
 *  e  1 2
 *  e  1   3
 *  k  1     4
 *  s  1        5
 *
 *
 * We maintain a matrix , of m * n where each cell represent the size of matching
 * substring until  0-i in x & 0-j y
 */

function LCSubStr(x: string, y: string, m: number, n: number): number {
    const map: number[][] = Array(m)
        .fill(null)
        .map(() => []);

    let subStrLen = 0;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (x[i] === y[j]) {
                map[i][j] = 1 + (map[i - 1]?.[j - 1] ?? 0);
                subStrLen = Math.max(map[i][j], subStrLen);
            } else map[i][j] = 0;
        }
    }
    // console.log(map);
    return subStrLen;
}

console.log(LCSubStr('GeeksforGeeks', 'QuizGeeks', 13, 9));
console.log(LCSubStr('abcdxyz', 'xyzabcd', 7, 7));
console.log(LCSubStr('a', 'a', 1, 1));
