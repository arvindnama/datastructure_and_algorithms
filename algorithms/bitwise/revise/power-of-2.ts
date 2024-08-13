const isPowerOf2 = (n: number): boolean => (n & (n - 1)) === 0;

console.log('isPowerOf2(4)', isPowerOf2(4));
console.log('isPowerOf2(9)', isPowerOf2(9));
