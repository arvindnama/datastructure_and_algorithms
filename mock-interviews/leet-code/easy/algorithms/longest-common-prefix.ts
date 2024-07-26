/**
 * Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".
 */

function longestCommonPrefix(strs: string[]): string {
    let prefix = strs[0];

    const commonPrefix = (s1: string, s2: string): string => {
        let i = 0;
        let p = '';
        while (i < s1.length && i < s2.length) {
            if (s1[i] === s2[i]) {
                p += s1[i];
                i++;
                continue;
            }
            break;
        }
        return p;
    };

    for (let i = 1; i < strs.length && prefix !== ''; i++) {
        prefix = commonPrefix(prefix, strs[i]);
    }

    return prefix;
}

console.log(longestCommonPrefix(['flower', 'flow', 'flight']));
console.log(longestCommonPrefix(['dog', 'racecar', 'car']));
console.log(longestCommonPrefix(['flowershop', 'flow', 'flower']));
