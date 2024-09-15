/**
 * A  sentence is a string of single-space separated words where each word consists only of lowercase letters.

A word is uncommon if it appears exactly once in one of the sentences, and does not appear in the other sentence.

Given two sentences s1 and s2, return a list of all the uncommon words. You may return the answer in any order.


 */

function uncommonFromSentences(s1: string, s2: string): string[] {
    const [words1, words2] = [s1.split(' '), s2.split(' ')];

    const map: { [word in string]: [number, number] } = {};

    for (const word of words1) {
        map[word] = map[word] || [0, 0];
        map[word][0]++;
    }

    for (const word of words2) {
        map[word] = map[word] || [0, 0];
        map[word][1]++;
    }

    return Object.keys(map).reduce((acc, cur) => {
        const [c1, c2] = map[cur];
        if ((c1 === 1 && c2 === 0) || (c2 === 1 && c1 === 0))
            return [...acc, cur];
        return acc;
    }, [] as string[]);
}

console.log(uncommonFromSentences('this apple is sweet', 'this apple is sour'));
console.log(uncommonFromSentences('apple apple', 'banana'));
