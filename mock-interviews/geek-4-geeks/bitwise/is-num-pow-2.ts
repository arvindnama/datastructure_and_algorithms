/**
 * bitwise & of N & N-1 will always be zero
 */
const isPowOf2 = (num: number): boolean => {
    return !(num & (num - 1));
};

console.log('is 2 power of 2', isPowOf2(2));
console.log('is 3 power of 2', isPowOf2(3));
console.log('is 4 power of 2', isPowOf2(4));
console.log('is 5 power of 2', isPowOf2(5));
