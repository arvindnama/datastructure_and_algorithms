const postOfRightMostSetBit = (n: number): number => {
    let pos = 0;
    while (n) {
        pos++;
        if ((n & 1) === 1) {
            return pos;
        }
        n = n >> 1;
    }
    return -1;
};

console.log('postOfRightMostSetBit(4)', postOfRightMostSetBit(4));
console.log('postOfRightMostSetBit(1)', postOfRightMostSetBit(1));
console.log('postOfRightMostSetBit(8)', postOfRightMostSetBit(8));
