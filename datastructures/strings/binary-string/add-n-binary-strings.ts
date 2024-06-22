/**
 * Given n binary strings, return their sum (also a binary string).
 */

const addBinaryStrings = (arr: string[]): string => {
    const add = (s1: string, s2: string): string => {
        let res = '';
        let n = s1.length - 1;
        let m = s2.length - 1;
        let c = 0;
        const get = (s: string, i: number) =>
            i >= 0 && i <= s.length - 1 ? +s[i] : 0;

        while (m >= 0 || n >= 0) {
            const sum = get(s2, m) + get(s1, n) + c;
            const d = sum % 2;
            c = Math.floor(sum / 2);
            res = `${d}${res}`;
            m--;
            n--;
        }

        if (c) res = `${c}${res}`;

        return res;
    };

    return arr.reduce((acc, cur) => add(acc, cur), '0');
};

console.log(
    'Add all Binary string',
    ['11', '1'],
    addBinaryStrings(['11', '1'])
);
console.log(
    'Add all Binary string',
    ['1', '10', '11'],
    addBinaryStrings(['1', '10', '11'])
);
