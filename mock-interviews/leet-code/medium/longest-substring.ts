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

    let maxSubLen = 0;
    let start = 0;
    const map: { [k in string]: number } = { [s[0]]: 0 };
    for (let i = 1; i < s.length; i++) {
        map[s[i]] = map[s[i]] || 0;
        map[s[i]]++;
        if (map[s[i]] > 1) {
            // there is a repeating char in the sub string.
            const subLen = i - start;
            maxSubLen = Math.max(maxSubLen, subLen);
            // reset start.
            start = s.substring(start, i).indexOf(s[i]) + 1;
            console.log(subLen, s.substring(start, i));
        }
        i++;
    }
    console.log(map);
    return maxSubLen || s.length;
}

console.log(lengthOfLongestSubstring('abcabcbb'));
// console.log(lengthOfLongestSubstring('bbbbbbb'));
// console.log(lengthOfLongestSubstring('pwwkew'));
// console.log(lengthOfLongestSubstring('abcdefghi'));
