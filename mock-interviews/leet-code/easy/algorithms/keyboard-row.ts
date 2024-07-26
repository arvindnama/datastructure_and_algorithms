/**
 * Given an array of strings words, return the words that can be typed using letters of the alphabet on only one row of American keyboard like the image below.

In the American keyboard:

the first row consists of the characters "qwertyuiop",
the second row consists of the characters "asdfghjkl", and
the third row consists of the characters "zxcvbnm".
 */

function findWords(words: string[]): string[] {
    const map: { [k in string]: number } = {};

    ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'].forEach((row, idx) => {
        row.split('').forEach((a) => (map[a] = idx));
    });

    return words.filter((word) => {
        const rowIdx = map[word[0].toLocaleLowerCase()];
        return word
            .split('')
            .every((c) => map[c.toLocaleLowerCase()] === rowIdx);
    });
}

console.log(findWords(['Alaska', 'dad', 'Peace']));
console.log(findWords(['omk']));
console.log(findWords(['asdfg']));
