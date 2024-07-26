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
     *    if we get the midPoint of substring that is a palindrome (abc)
     * Then it is easy to expand on top of midPoint (i.e xabcx or xabcy)
     * and check for next big palindrome.
     *
     * We can start with each index as midpoint and each char is as a palindrome
     * and build on top of it.
     *
     * midpoint of a substring become a challenge in case of
     * substring with even length.
     *   - For Even length we will need to start left point as midPoint and
     *     right pointer as midPoint + 1
     *   - For odd it should not be an issue left can be midPoint - 1 & right is
     *     midpoint +1
     *
     * Steps:
     *     - for every idex assume it is a palindrome
     *      - assume that end substring can be a even length and expand over it
     *      - assume that end substring can be a odd length and expand over it
     *      - take a max of both to get the max length of the substring with i as
     *        as midpoint.
     *      - check this length with the global length of the previous palindrome
     *          if bigger replace them
     */

    let [start, end] = [0, 0];

    const getMaxLengthOfPal = (l: number, r: number): number => {
        while (l >= 0 && r < s.length && s[l] === s[r]) {
            l--;
            r++;
        }
        // max length
        return r - l - 1;
    };

    for (let mid = 0; mid < s.length; mid++) {
        const odd = getMaxLengthOfPal(mid, mid + 1);
        const even = getMaxLengthOfPal(mid - 1, mid + 1);
        const maxLength = Math.max(odd, even);

        if (maxLength > end - start) {
            // incase the substr length is even we will need to mid point to be -1
            // we can skip for odd, but since we are doing math.floor it does not
            // matter
            start = mid - Math.floor((maxLength - 1) / 2);
            end = mid + Math.floor(maxLength / 2);
        }
    }
    return s.substring(start, end + 1);
}

console.log(longestPalindrome('babad'));
console.log(longestPalindrome('cbbd'));
console.log(longestPalindrome('abb'));
