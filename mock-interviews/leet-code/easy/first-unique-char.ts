/**
 * Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.
 */

function firstUniqChar(s: string): number {
    const map: { [k in string]: Array<number> } = {};
    for (let i = 0; i < s.length; i++) {
        map[s[i]] = map[s[i]] || [];
        map[s[i]].push(i);
    }

    const res = Object.keys(map)
        .filter((k) => map[k].length === 1)
        .reduce((acc, cur) => {
            return Math.min(acc, map[cur][0]);
        }, Number.MAX_SAFE_INTEGER);
    return res === Number.MAX_SAFE_INTEGER ? -1 : res;
}

console.log(firstUniqChar('leetcode'));
console.log(firstUniqChar('loveleetcode'));
console.log(firstUniqChar('aabbb'));
console.log(firstUniqChar('aabbc'));
