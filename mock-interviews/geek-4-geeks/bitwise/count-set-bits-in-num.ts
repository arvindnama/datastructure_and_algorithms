/**
 * num & 1 will tell if last bit is set.
 * right shift num by 1 and repeat till num is zero
 */
const countSetBits = (n: number): number => {
    let count = 0;
    while (n) {
        count += n & 1;
        n >>= 1;
    }
    return count;
};

console.log('no. of set bits in 100001', countSetBits(0b100001));
console.log('no. of set bits in 1111', countSetBits(0b1111));
console.log('no. of set bits in 10000', countSetBits(0b100000));
