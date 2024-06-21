/**
 * Given a binary string, find if it is possible to make all its digits equal (either all 0’s or all 1’s) by flipping exactly one bit.
 */

const checkIfBitCanBeMadeSame = (str: string): boolean => {
    const map: { [key in string]: number } = {
        '0': 0,
        '1': 0,
    };

    for (let i = 0; i < str.length; i++) {
        map[str.charAt(i)]++;
    }

    return map['0'] >= str.length - 1 || map['1'] >= str.length - 1;
};

console.log(
    'check if bits can be made same',
    '101',
    checkIfBitCanBeMadeSame('101')
);
console.log(
    'check if bits can be made same',
    '111',
    checkIfBitCanBeMadeSame('111')
);

console.log(
    'check if bits can be made same',
    '100',
    checkIfBitCanBeMadeSame('100')
);
console.log(
    'check if bits can be made same',
    '1100',
    checkIfBitCanBeMadeSame('1100')
);
