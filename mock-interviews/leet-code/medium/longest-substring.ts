/**
 * Given a string s, find the length of the longest
substring
 without repeating characters.
 */

function lengthOfLongestSubstring(s: string): number {
    // let maxSub = '';
    // for (let i = 0; i < s.length; i++) {
    //     let sub = s[i];
    //     for (let j = i + 1; j < s.length; j++) {
    //         if (sub.includes(s[j])) break;
    //         sub += s[j];
    //     }
    //     maxSub = sub.length > maxSub.length ? sub : maxSub;
    // }

    // return maxSub.length;

    if (!s) return 0;

    let [maxSubLen, start, i] = [0, 0, 1];

    const map: { [k in string]: number } = { [s[0]]: 0 };
    const updateMaxLen = () => {
        // there is a repeating char in the sub string.
        const subLen = i - start;
        maxSubLen = Math.max(maxSubLen, subLen);
    };
    for (; i < s.length; i++) {
        map[s[i]] = map[s[i]] >= 0 ? map[s[i]] : -1;
        if (map[s[i]] >= start) {
            updateMaxLen();
            // reset start, to the previously found char after s[i]
            // start = s.indexOf(s[i], start) + 1;
            start = map[s[i]] + 1;
        }
        map[s[i]] = i;
    }
    updateMaxLen();
    return maxSubLen || s.length;
}

console.log(lengthOfLongestSubstring('abba'));
console.log(lengthOfLongestSubstring('aab'));
console.log(lengthOfLongestSubstring('abcabcbb'));
console.log(lengthOfLongestSubstring('bbbbbbb'));
console.log(lengthOfLongestSubstring('pwwkew'));
console.log(lengthOfLongestSubstring('abcdefghi'));
