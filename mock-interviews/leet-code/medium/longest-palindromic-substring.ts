/**
 * Given a string s, return the longest palindromic substring in s.
 */

function longestPalindrome(s: string): string {
    // const isPal = (start: number, end: number): boolean => {
    //     while (start < end) {
    //         if (s[start] !== s[end]) return false;
    //         start++;
    //         end--;
    //     }
    //     return true;
    // };
    // let lPalStr = s[0];
    // for (let i = 0; i < s.length; i++) {
    //     for (let j = s.length - 1; j >= i; j--) {
    //         if (isPal(i, j) && j - i + 1 > lPalStr.length) {
    //             lPalStr = s.substring(i, j + 1);
    //         }
    //     }
    // }
    /**
     * O(n^2)
     * we will need to start find a midpoint from where we can grow
     * one step at a time (left & right) till palindrome condition is satisfied.
     *
     * - start each index as mid point and try expanding to find a pal ,
     * - when found we will need to compare with max_length previously found
     * - mid-point has even/odd problem to deal with
     *    mid-point of a odd length substring is simple s.len/2
     *    mid-point of a even length substring is a bit odd is simple, it is
     *    s.len/2 - 1
     * - since we do not know if palindrome string is of evenLength or oddLength
     *    we will need to assume they can be of both length, so get pal for both
     *    assumptions and take the max.
     */

    let [start, end] = [0, 0];
    const expandOverMidPoint = (l: number, r: number): number => {
        while (l >= 0 && r < s.length && s[r] === s[l]) {
            r++;
            l--;
        }
        return r - l - 1; // we offset moved by one hence take it off(-1)
    };

    for (let i = 0; i < s.length; i++) {
        const odd = expandOverMidPoint(i, i + 1);
        const even = expandOverMidPoint(i - 1, i + 1);
        const maxLen = Math.max(odd, even);

        if (maxLen > end - start) {
            // i being the mid point ...
            // start will be 1/2 steps left of it (i)
            // start will be 1/2 steps right of it (i)
            // in case of odd len sub string , since mid-point is always len/2 -1
            // start will be maxLen - 1 / 2
            start = i - Math.max(Math.floor((maxLen - 1) / 2));
            end = i + Math.max(Math.floor(maxLen / 2));
        }
    }
    return s.substring(start, end + 1);
}

console.log(longestPalindrome('babad'));
console.log(longestPalindrome('cbbd'));
console.log(longestPalindrome('abb'));
