/**
 * Given two string arrays words1 and words2, return the number of strings that appear exactly once in each of the two arrays.
 */

function countWords(words1: string[], words2: string[]): number {
    const map: { [work in string]: [number, number] } = {};
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
        if (c1 === 1 && c2 === 1) return acc + 1;
        return acc;
    }, 0);
}

console.log(
    countWords(
        ['leetcode', 'is', 'amazing', 'as', 'is'],
        ['amazing', 'leetcode', 'is']
    )
);

console.log(countWords(['b', 'bb', 'bbb'], ['a', 'aa', 'aaa']));
console.log(countWords(['a', 'ab'], ['a', 'a', 'a', 'ab']));
