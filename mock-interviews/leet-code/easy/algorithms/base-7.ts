/**
 * Given an integer num, return a string of its base 7 representation.


 */

function convertToBase7(num: number): string {
    if (num == 0) return '0';
    let res = '';
    const isNegative = num < 0;
    num = Math.abs(num);
    while (num > 0) {
        const rem = num % 7;
        res = `${rem}${res}`;
        num = Math.floor(num / 7);
    }
    return isNegative ? `-${res}` : res;
}

console.log(convertToBase7(100));
console.log(convertToBase7(-7));
