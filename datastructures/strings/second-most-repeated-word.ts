import {
    MinHeap,
    HeapElement,
    ObjectWithValue,
} from '../../models/heap.models';

const findNthMostRepeatedWord = (words: string[], n: number): string => {
    const map: { [key in string]: number } = {};

    for (let i = 0; i < words.length; i++) {
        map[words[i]] = (map[words[i]] ?? 0) + 1;
    }

    const wordsModified = Object.keys(map).map(
        (k) =>
            ({
                str: k,
                valueOf: () => map[k],
            }) as HeapElement
    );

    const heap = new MinHeap(n);
    for (let i = 0; i < wordsModified.length; i++) {
        if (i < n) heap.insert(wordsModified[i]);
        else if (
            (heap.getTop() as ObjectWithValue).valueOf() <
            (wordsModified[i].valueOf() as number)
        ) {
            heap.removeTop();
            heap.insert(wordsModified[i]);
        }
    }

    return (heap.removeTop() as any).str;
};

console.log(
    'second largest string in array',
    findNthMostRepeatedWord(['aaa', 'bbb', 'ccc', 'bbb', 'aaa', 'aaa'], 2)
);

console.log(
    'second largest string in array',
    findNthMostRepeatedWord(['geeks', 'for', 'geeks', 'for', 'geeks', 'aaa'], 2)
);
