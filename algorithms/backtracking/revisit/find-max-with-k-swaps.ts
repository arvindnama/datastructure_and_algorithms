/**
 * Given two positive integers M and K, find the maximum integer possible by doing at-most K swap operations on its digits.
 */

const findMax = (num: number, k: number): number => {
    let res: number = num;
    const solve = (numStr: string, pos: number, k: number) => {
        if (k === 0) {
            res = Math.max(parseInt(numStr), res);
            return;
        }

        let maxIdx = pos;
        for (let i = pos + 1; i < numStr.length; i++) {
            if (numStr[i] >= numStr[maxIdx]) {
                maxIdx = i;
            }
        }
        if (numStr[pos] >= numStr[maxIdx]) {
            // dont swap as current pos will yield greater value.
            // skip the swap and move to next pos
            solve(numStr, pos + 1, k);
            return;
        }
        const numStrArr = numStr.split('');
        [numStrArr[pos], numStrArr[maxIdx]] = [
            numStrArr[maxIdx],
            numStrArr[pos],
        ];
        numStr = numStrArr.join('');
        solve(numStr, pos + 1, k - 1);
    };
    solve(`${num}`, 0, k);
    return res;
};

console.log(findMax(254, 1));
console.log(findMax(254, 2));
console.log(findMax(68543, 1));
console.log(findMax(7599, 2));
console.log(findMax(76543, 1));
console.log(findMax(129814999, 4));
