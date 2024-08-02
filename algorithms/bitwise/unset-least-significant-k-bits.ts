const unsetLeastSignificantKBits = (n: number, k: number): number => {
    let i = 0;
    let res = '';
    while (n) {
        const lsb = i < k ? 0 : n % 2;
        res = `${lsb}${res}`;
        n = Math.floor(n / 2);
        i++;
    }

    return parseInt(res, 2);
};

const unsetLeastSignificantKBits2 = (n: number, k: number): number => {
    const mask = ~0 << k; //
    return n & mask;
};

console.log(
    'unset least significant k bits',
    200,
    5,
    unsetLeastSignificantKBits(200, 2),
    unsetLeastSignificantKBits2(200, 2)
);

console.log(
    'unset least significant k bits',
    730,
    3,
    unsetLeastSignificantKBits(730, 3),
    unsetLeastSignificantKBits2(730, 3)
);
