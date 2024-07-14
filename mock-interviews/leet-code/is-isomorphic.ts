/**
 * Given two strings s and t, determine if they are isomorphic.

Two strings s and t are isomorphic if the characters in s can be replaced to get t.

All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.
 */

function isIsomorphic(s: string, t: string): boolean {
    const mapS: { [k in string]: number } = {};
    const mapT: { [k in string]: number } = {};

    for (let i = 0; i < s.length; i++) {
        if (mapS[s[i]] !== mapT[t[i]]) return false;
        mapS[s[i]] = i;
        mapT[t[i]] = i;
    }

    return true;
}

console.log(isIsomorphic('add', 'egg'));
console.log(isIsomorphic('foo', 'bar'));
console.log(isIsomorphic('paper', 'title'));

console.log(isIsomorphic('bbbaaaba', 'aaabbbba'));
console.log(isIsomorphic('badc', 'baba'));
