/**
 * Given a string and array of keywords, highlight the words in the string that are part of the array of keywords.

const str = "Ultimate JavaScript / FrontEnd Guide";
const words = ['Front', 'End', 'JavaScript'];

highlight(str, words);

// "Ultimate <strong>JavaScript</strong> / <strong>FrontEnd</strong> Guide"
 */

const highlight = (str: string, words: string[]): string => {
    const wordsToHighlight = new Set(words);

    return str
        .split(' ')
        .map((word) => {
            if (wordsToHighlight.has(word)) {
                return `<strong>${word}</strong>`;
            } else {
                // try splitting the word and see if there something to highlight

                for (let i = 1; i < word.length; i++) {
                    const [s1, s2] = [word.substring(0, i), word.slice(i)];
                    if (wordsToHighlight.has(s1) && wordsToHighlight.has(s2)) {
                        return `<strong>${word}</strong>`;
                    } else if (
                        wordsToHighlight.has(s1) &&
                        !wordsToHighlight.has(s2)
                    ) {
                        return `<strong>${s1}</strong>${s2}`;
                    } else if (
                        !wordsToHighlight.has(s1) &&
                        wordsToHighlight.has(s2)
                    ) {
                        return `${s1}<strong>${s2}</strong>`;
                    }
                }
                return word;
            }
        })
        .join(' ');
};

console.log(
    highlight('Ultimate JavaScript / FrontEnd Guide', [
        'Front',
        'End',
        'JavaScript',
    ])
);
