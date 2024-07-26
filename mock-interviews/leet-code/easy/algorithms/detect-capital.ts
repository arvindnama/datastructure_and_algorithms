/**
 * We define the usage of capitals in a word to be right when one of the following cases holds:

All letters in this word are capitals, like "USA".
All letters in this word are not capitals, like "leetcode".
Only the first letter in this word is capital, like "Google".
Given a string word, return true if the usage of capitals in it is right.
 */

function detectCapitalUse(word: string): boolean {
    return !!/^[A-Z]+$|^[a-z]+$|^[A-Z][a-z]+$/.exec(word);
}

console.log(detectCapitalUse('USA'));
console.log(detectCapitalUse('Google'));
console.log(detectCapitalUse('leetcode'));
console.log(detectCapitalUse('saF'));
console.log(detectCapitalUse('FlaG'));
