const firstSetBit = (n: number): number => {
    let pos = 0;
    while (n) {
        pos++;
        if (n & 1) return pos;
        n >>= 1;
    }
    return pos;
};

console.log(firstSetBit(0b100));
console.log(firstSetBit(0b10101));
