const minMaxInSentence = (sentence: string): [string, string] => {
    const words = sentence.split(' ');
    words.sort((a, b) => a.length - b.length);
    return [words[0], words[words.length - 1]];
};

console.log('Min Max in a sentence', minMaxInSentence('This is a test string'));
console.log(
    'Min Max in a sentence',
    minMaxInSentence('GeeksforGeeks A computer Science portal for Geeks')
);
