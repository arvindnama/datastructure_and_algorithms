/**
 * Given a string s, check if it can be constructed by taking a substring of it and appending multiple copies of the substring together.
 */

function repeatedSubstringPattern(s: string): boolean {
    const s2 = `${s.slice(1)}${s.slice(0, s.length - 1)}`;
    return s2.includes(s);
}

console.log(repeatedSubstringPattern('ababab'));
console.log(repeatedSubstringPattern('abac'));
console.log(repeatedSubstringPattern('abab'));
console.log(repeatedSubstringPattern('abadabac'));
console.log(repeatedSubstringPattern('abcabcabcabc'));
