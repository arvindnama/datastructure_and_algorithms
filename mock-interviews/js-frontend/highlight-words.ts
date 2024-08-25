/**
 * Given a string and array of keywords, highlight the words in the string that are part of the array of keywords.

const str = "Ultimate JavaScript / FrontEnd Guide";
const words = ['Front', 'End', 'JavaScript'];

highlight(str, words);

// "Ultimate <strong>JavaScript</strong> / <strong>FrontEnd</strong> Guide"
 */

const highlight = (str: string, words: string[]): string => {
    const keywords = new Set(words);

    const processedWords = str.split(' ').map((word) => {
        if (keywords.has(word)) {
            return `<strong>${word}</strong>`;
        } else {
            for (let i = 1; i < word.length; i++) {
                const [p, s] = [word.slice(0, i), word.substring(i)];
                if (keywords.has(p) && keywords.has(s)) {
                    return `<strong>${p}${s}</strong>`;
                } else if (keywords.has(p) && !keywords.has(s)) {
                    return `<strong>${p}</strong>${s}`;
                } else if (!keywords.has(p) && keywords.has(s)) {
                    return `${p}<strong>${s}</strong>`;
                }
            }
            return word;
        }
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
