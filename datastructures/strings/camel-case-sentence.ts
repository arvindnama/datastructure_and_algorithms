const convert = (sentence: string): string => {
    const words = sentence.split(' ');
    return words
        .filter((word) => !!word)
        .map((word) => `${word[0].toUpperCase()}${word.substring(1)}`)
        .join('');
};

console.log(
    'convert to camel case n remove space',
    convert(' I got intern at geeksforgeeks')
);
console.log(
    'convert to camel case n remove space',
    convert('Here comes the garden')
);
