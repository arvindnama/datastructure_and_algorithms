//Given a positive integer N, the task is to count the total number of set bits in

const countAllSetBitsInAllNaturalNums = (n: number): number => {
    const countAllSetBit = (n: number): number => {
        let count = 0;
        while (n) {
            count += n & 1;
            n >>= 1;
        }
        return count;
    };

    return Array(n)
        .fill(0)
        .reduce((acc, _, idx) => {
            acc += countAllSetBit(idx + 1);
            return acc;
        }, 0);
};

console.log(
    'countAllSetBitsInAllNaturalNums',
    3,
    countAllSetBitsInAllNaturalNums(3)
);

console.log(
    'countAllSetBitsInAllNaturalNums',
    6,
    countAllSetBitsInAllNaturalNums(6)
);

console.log(
    'countAllSetBitsInAllNaturalNums',
    7,
    countAllSetBitsInAllNaturalNums(7)
);
