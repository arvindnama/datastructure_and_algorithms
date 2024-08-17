/**
 * Given a number n, the task is to generate n bit Gray codes (generate bit patterns from 0 to 2^n-1 such that successive patterns differ by one bit)
 */

const generateNBitCode = (n: number): number[] => {
    const res: number[] = [];

    const generate = (idx: number, num: string) => {
        if (idx === n) {
            res.push(parseInt(num, 2));
            return;
        }

        generate(idx + 1, `0${num}`);
        generate(idx + 1, `1${num}`);
    };
    generate(0, '');
    return res;
};

const generateNBitCode2 = (n: number): number[] => {
    const res: number[] = [];

    const generate = (n: number, num: number) => {
        if (n === 0) {
            res.push(num);
            return;
        }
        generate(n - 1, num);
        num = (1 << (n - 1)) | num;
        generate(n - 1, num);
    };

    generate(n, 0);
    return res;
};

console.log(generateNBitCode(2));
console.log(generateNBitCode(3));
console.log(generateNBitCode(4));

console.log(generateNBitCode2(2));
console.log(generateNBitCode2(3));
console.log(generateNBitCode2(4));
