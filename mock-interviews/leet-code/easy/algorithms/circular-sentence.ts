/**
 * A sentence is a list of words that are separated by a single space with no leading or trailing spaces.

For example, "Hello World", "HELLO", "hello world hello world" are all sentences.
Words consist of only uppercase and lowercase English letters. Uppercase and lowercase English letters are considered different.

A sentence is circular if:

The last character of a word is equal to the first character of the next word.
The last character of the last word is equal to the first character of the first word.
For example, "leetcode exercises sound delightful", "eetcode", "leetcode eats soul" are all circular sentences. However, "Leetcode is cool", "happy Leetcode", "Leetcode" and "I like Leetcode" are not circular sentences.

Given a string sentence, return true if it is circular. Otherwise, return false.
 */

function isCircularSentence(sentence: string): boolean {
    /**
     * Split sentence into words
     * 1st check : 0th & nth word  words[n][words[n].length - 1] === words[0][0]
     * 2nd check:
     * for every word word, idx => last char of word === first car of Words[idx]
     * // we can club 1st and 2nd check
     * when idx === n , idx % n -> last word will check first work
     */

    const words = sentence.split(' ');

    return words.every((word, idx) => {
        const nextWord = words[(idx + 1) % words.length];
        return word[word.length - 1] == nextWord[0];
    });
}

console.log(isCircularSentence('leetcode exercises sound delightful'));
console.log(isCircularSentence('eetcode'));
console.log(isCircularSentence('Leetcode is cool'));
