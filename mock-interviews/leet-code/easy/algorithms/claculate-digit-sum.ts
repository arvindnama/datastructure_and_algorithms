/**
 * You are given a string s consisting of digits and an integer k.

A round can be completed if the length of s is greater than k. In one round, do the following:

Divide s into consecutive groups of size k such that the first k characters are in the first group, the next k characters are in the second group, and so on. Note that the size of the last group can be smaller than k.
Replace each group of s with a string representing the sum of all its digits. For example, "346" is replaced with "13" because 3 + 4 + 6 = 13.
Merge consecutive groups together to form a new string. If the length of the string is greater than k, repeat from step 1.
Return s after all rounds have been completed.
 */

function digitSum(s: string, k: number): string {
    /**
     *
     *  if s.length <= k return s;
     *
     * Approach-1
     *    divide s in smaller group of length k and calculate sum and stitch back
     *    & recurse.
     *
     * Approach-2:
     *    traverse trough s , starting with a temp counter c & temp subStr ss,
     *    if c < k s[i] to subStr (also do sum)
     *    if c === k-1 , newS = `${newS}${ss}` c = 0
     *
     *   if c > 0 append c to newS

     *   11111222223  k = 3 , c= 0 ss = 0
     *   i
     *   11111222223  k = 3 , c= 1 ss = 1+1  newStr = ''
     *     i
     *   11111222223  k = 3 , c= 2 ss = 0  newStr = '2'
     *     i
     *   11111222223  k = 3 , c= 0 ss = 1  newStr = '2'
     *      i
     *      c
     */

    if (s.length <= k) return s;
    let newStr = '';

    let [count, subStrNum] = [0, 0];
    for (let i = 0; i < s.length; i++) {
        const charNum = parseInt(s[i]);
        if (count < k - 1) {
            subStrNum += charNum;
            count++;
            continue;
        }
        // c === k -1
        subStrNum += charNum;
        count = 0;
        newStr = `${newStr}${subStrNum}`;
        subStrNum = 0;
    }

    if (count > 0) newStr = `${newStr}${subStrNum}`;
    return digitSum(newStr, k);
}

console.log(digitSum('11111222223', 3));
console.log(digitSum('00000000', 3));
