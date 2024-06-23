/**
 * num & 1 should reveal if right most bit is set.
 * repeat and count until n is not zero
 */
const posOfRightMostSetBit = (n: number): number => {
    if (n === 0) return -1;

    let pos = 0;
    let isLastPosOne = false;
    do {
        isLastPosOne = !!(n & 1);
        pos++;
        n >>= 1;
    } while (n && !isLastPosOne);

    return pos;
};

console.log(
    'Position of right most bit of 10000',
    posOfRightMostSetBit(0b10000)
);
console.log(
    'Position of right most bit of 10100',
    posOfRightMostSetBit(0b10100)
);

console.log(
    'Position of right most bit of 10100100',
    posOfRightMostSetBit(10100100)
);
