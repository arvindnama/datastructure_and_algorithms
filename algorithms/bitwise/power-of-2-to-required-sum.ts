//Given an integer N, task is to find the numbers which when raised to the power of 2 and added finally, gives the integer N.

const powerOf2RequiedToSum = (n: number): number[] => {
    const res: number[] = [];
    let bitCount = 0;
    while (n) {
        if (n % 2 == 1) {
            res.push(bitCount);
        }
        bitCount++;
        n = Math.floor(n / 2);
    }
    return res;
};

console.log(
    'numbers with when raised to power of 2 and add will result in',
    71307,
    powerOf2RequiedToSum(71307)
);

console.log(
    'numbers with when raised to power of 2 and add will result in',
    1213,
    powerOf2RequiedToSum(1213)
);
