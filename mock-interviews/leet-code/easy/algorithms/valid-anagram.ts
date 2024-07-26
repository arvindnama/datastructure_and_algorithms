/**
 * Given two strings s and t, return true if t is an anagram of s, and false otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.
 */

function isAnagram(s: string, t: string): boolean {
    if (s.length !== t.length) return false;
    const s1 = s.split('').sort();
    const t1 = t.split('').sort();

    for (let i = 0; i < s1.length; i++) {
        if (s1[i] !== t1[i]) return false;
    }
    return true;
}

console.log(isAnagram('anagram', 'nagaram'));
console.log(isAnagram('rat', 'car'));
console.log(isAnagram('a😊r', '😊ar'));
