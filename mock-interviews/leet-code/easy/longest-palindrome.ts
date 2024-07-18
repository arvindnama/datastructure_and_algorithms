/**
 * Given a string s which consists of lowercase or uppercase letters, return the length of the longest
palindrome
 that can be built with those letters.

 */

function longestPalindrome(s: string): number {
    const map: { [k in string]: number } = {};
    for (let i = 0; i < s.length; i++) {
        map[s[i]] = map[s[i]] || 0;
        map[s[i]]++;
    }

    let len = 0;
    const arr = Object.values(map).sort((a, b) => b - a);
    arr.map((c, idx) => {
        if (c % 2 == 0) {
            len += c;
            arr[idx] = 0;
        } else if (c - 1 > 0) {
            len += c - 1;
            arr[idx] -= c - 1;
        }
    });
    if (arr.some((a) => a > 0)) len++;
    return len;
}

console.log(longestPalindrome('a'));
console.log(longestPalindrome('abccccdd'));
console.log(longestPalindrome('abbcccccddd'));
