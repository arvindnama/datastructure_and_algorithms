/**
 * Given a string and array of keywords, highlight the words in the string that are part of the array of keywords.

const str = "Ultimate JavaScript / FrontEnd Guide";
const words = ['Front', 'End', 'JavaScript'];

highlight(str, words);

// "Ultimate <strong>JavaScript</strong> / <strong>FrontEnd</strong> Guide"
 */

const highlight = (str: string, words: string[]): string => {
    const keyWords = new Set(words);
    const wrapStrong = (s: string) => `<strong>${s}</strong>`;
    const processedWords = str.split(' ').map((word) => {
        if (keyWords.has(word)) {
            return wrapStrong(word);
        }
        // may be somepart of the word is part of keyword

        for (let i = 1; i < word.length; i++) {
            const [p1, p2] = [word.slice(0, i), word.substring(i)];
            if (keyWords.has(p1) && keyWords.has(p2)) {
                return `${wrapStrong(p1 + p2)}`;
            } else if (keyWords.has(p1) && !keyWords.has(p2)) {
                return `${wrapStrong(p1)}${p2}`;
            } else if (!keyWords.has(p1) && keyWords.has(p2)) {
                return `${p1}${wrapStrong(p2)}`;
            }
        }
        return word;
    });

    return processedWords.join(' ');
};

console.log(
    highlight('Ultimate JavaScript / FrontEnd Guide', [
        'Front',
        'End',
        'JavaScript',
    ])
);
