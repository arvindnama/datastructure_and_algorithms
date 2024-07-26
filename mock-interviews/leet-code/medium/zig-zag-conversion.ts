/***
 * The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)
 */

function convert(s: string, numRows: number): string {
    const arr: string[][] = [];

    for (let i = 0, arrIdx = 0, isDown = true; i < s.length; i++) {
        arr[arrIdx] = arr[arrIdx] || [];
        arr[arrIdx].push(s[i]);

        if (isDown) {
            if (arrIdx == numRows - 1) {
                isDown = !isDown;
                arrIdx = arrIdx === 0 ? arrIdx : arrIdx - 1;
                continue;
            }
            arrIdx++;
        } else {
            if (arrIdx == 0) {
                isDown = !isDown;
                arrIdx++;
                continue;
            }
            arrIdx--;
        }
    }
    return arr.reduce((acc, cur) => `${acc}${cur.join('')}`, '');
}

console.log(convert('PAYPALISHIRING', 3));
console.log(convert('PAYPALISHIRING', 4));
console.log(convert('A', 1));
console.log(convert('AB', 1));
console.log(convert('ABC', 2));
console.log(convert('ABCD', 3));
