/**
 * You are given two numbers A and B. The task is to count the number of bits needed to be flipped to convert A to B.
 */

const bitDiff = (a: number, b: number): number => {
    let k = 0;
    while (a || b) {
        if ((a & 1) !== (b & 1)) k++;
        a >>= 1;
        b >>= 1;
    }
    return k;
};

console.log(bitDiff(10, 20));
console.log(bitDiff(20, 25));
