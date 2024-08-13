const countSetBits = (n: number): number => {
    let count = 0;
    while (n) {
        if (n % 2 === 1) count++;
        n = Math.floor(n / 2);
    }
    return count;
};

const countSetBits2 = (n: number): number => {
    let count = 0;
    while (n) {
        count += n & 1;
        n = n >> 1;
    }

    return count;
};

console.log('countSetBits(4)', countSetBits(4));
console.log('countSetBits(7)', countSetBits(7));

console.log('countSetBits2(4)', countSetBits2(4));
console.log('countSetBits2(7)', countSetBits2(7));
