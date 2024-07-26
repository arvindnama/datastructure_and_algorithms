/**
 * Given a pattern and a string s, find if s follows the same pattern.

Here follow means a full match, such that there is a bijection between a letter in pattern and a non-empty word in s.
 */

function wordPattern(pattern: string, s: string): boolean {
    const map: { [k in string]: string } = {};

    const words = s.split(' ');

    if (pattern.length !== words.length) return false;

    for (let i = 0; i < words.length; i++) {
        if (map[pattern[i]]) {
            if (map[pattern[i]] !== words[i]) return false;
        } else {
            if (Object.values(map).find((w) => w === words[i])) return false;
            map[pattern[i]] = words[i];
        }
    }
    return true;
}

console.log(wordPattern('abba', 'dog dog dog dog'));
console.log(wordPattern('abba', 'dog cat cat fish'));
console.log(wordPattern('abbc', 'dog cat cat fish'));
console.log(wordPattern('aaaa', 'dog cat cat dog'));
console.log(wordPattern('abba', 'dog cat cat dog'));
console.log(wordPattern('abba', 'dog constructor constructor dog'));
