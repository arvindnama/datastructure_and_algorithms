/**
 *
 * Given two strings str1 and str2 of length M and N respectively
 * and below operations that can be performed on str1.
 * Find the minimum number of edits (operations) to convert ‘str1‘ into ‘str2‘.
 *
 * Operation 1 (INSERT): Insert any character before or after any index of str1
 * Operation 2 (REMOVE): Remove a character of str1
 * Operation 3 (Replace): Replace a character at any index of str1 with some other character
 *
 *
 *  compare the last char of s1 & s2
 * There are 2 possibilities
 *   1. both chars same
 *          If same , proceed with next chars
 *   2. both chars diff
 *          we can try all 3 operations and take the min of them
 *       1 (since we are performing 1 edit)+ Min (editDist(replaceOp), editDist(removeOp), editDist(insertOp))
 *
 * Base condition ,
 *     if m === 0 ==> s1 is empty then we need to insert all remaining chars of s2 n
 *     if n === 0 ==> s2 is empty then we need to remove all remaining chars of s1 m
 */

const editDist = (s1: string, s2: string, m: number, n: number): number => {
    if (m === 0) return n; // s1 is empty , only op possible is to insert all n chars of s2
    if (n === 0) return m; // s2 is empty, only op possible is to remove all chars of s1
    // check for same last char case: since they are same no edit needed just recurse
    if (s1[m - 1] === s2[n - 1]) return editDist(s1, s2, m - 1, n - 1);

    return (
        1 +
        Math.min(
            // insert: we are inserting s2 in s2, so s1 has new entry, s1 stays and s2 shifts
            editDist(s1, s2, m, n - 1),
            // remove:cur char is removed, move s1 and compare with cur s2 char
            editDist(s1, s2, m - 1, n),
            // replace: cur char is replace with s2 , hence we move to next chars in both
            editDist(s1, s2, m - 1, n - 1)
        )
    );
};

let [s1, s2] = ['cat', 'cut'];
console.log(
    `Edit distance s1:${s1}, s2: ${s2}, edits::`,
    editDist(s1, s2, s1.length - 1, s2.length - 2)
);

[s1, s2] = ['GEEXSFRGEEKKS', 'GEEKSFORGEEKS'];
console.log(
    `Edit distance s1:${s1}, s2: ${s2}, edits::`,
    editDist(s1, s2, s1.length, s2.length)
);
