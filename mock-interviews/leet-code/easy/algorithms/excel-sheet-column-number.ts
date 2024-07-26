/**
 * Given a string columnTitle that represents the column title as appears in an Excel sheet, return its corresponding column number.
 */

function titleToNumber(columnTitle: string): number {
    // the column name can be assumed to be represented in base 26 number system.
    // with the only  caveat that the column no. start from
    // where any number system it start from 0.
    // so we will need to add 1 while converting to base 10 no system.

    const CharCode_A = 'A'.charCodeAt(0);
    let columnNo = 0;
    const n = columnTitle.length - 1;
    for (let i = n; i >= 0; i--) {
        const code = columnTitle.charCodeAt(i);
        const bit = code - CharCode_A;
        columnNo += (bit + 1) * 26 ** (n - i);
    }

    return columnNo;
}

console.log('A', titleToNumber('A'));
console.log('B', titleToNumber('B'));
console.log('Z', titleToNumber('Z'));
console.log('AA', titleToNumber('AA'));
console.log('ZY', titleToNumber('ZY'));
console.log('ZZ', titleToNumber('ZZ'));
console.log('ZZ', titleToNumber('AAA'));
