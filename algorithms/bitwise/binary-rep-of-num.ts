/**
 * while n
 * result = n % 2 + result
 * n = n /2
 */
const toBinary = (n: number): string => {
    let res = '';
    while (n) {
        res = `${n % 2}${res}`;
        n = Math.floor(n / 2);
    }
    return res || '0';
};

const toBinaryRec = (n: number): string => {
    const res: number[] = [];
    const convert = (n: number, res: number[]) => {
        if (n > 1) convert(Math.floor(n / 2), res);
        res.push(n % 2);
    };

    convert(n, res);
    return res.join('');
};

console.log('Iterative Method');
console.log('Binary representation of 7', toBinary(7));
console.log('Binary representation of 4', toBinary(4));
console.log('Binary representation of 0', toBinary(0));
console.log('Binary representation of 16', toBinary(16));
console.log('Binary representation of 15', toBinary(15));

console.log('Recursive Method');
console.log('Binary representation of 7', toBinaryRec(7));
console.log('Binary representation of 4', toBinaryRec(4));
console.log('Binary representation of 0', toBinaryRec(0));
console.log('Binary representation of 16', toBinaryRec(16));
console.log('Binary representation of 15', toBinaryRec(15));
