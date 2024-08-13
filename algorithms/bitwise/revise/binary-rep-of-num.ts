const toBinary = (n: number): string => {
    const convert = (n: number, res: string): string => {
        if (n === 0) return `0${res}`;
        res = `${n % 2}${res}`;
        return convert(Math.floor(n / 2), res);
    };

    return convert(n, '');
};

console.log('Binary representation of 7', toBinary(7));
console.log('Binary representation of 4', toBinary(4));
console.log('Binary representation of 0', toBinary(0));
console.log('Binary representation of 16', toBinary(16));
console.log('Binary representation of 15', toBinary(15));
