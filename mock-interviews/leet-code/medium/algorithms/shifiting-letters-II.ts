/**
 * You are given a string s of lowercase English letters and a 2D integer array shifts where shifts[i] = [starti, endi, directioni]. For every i, shift the characters in s from the index starti to the index endi (inclusive) forward if directioni = 1, or shift the characters backward if directioni = 0.

Shifting a character forward means replacing it with the next letter in the alphabet (wrapping around so that 'z' becomes 'a'). Similarly, shifting a character backward means replacing it with the previous letter in the alphabet (wrapping around so that 'a' becomes 'z').

Return the final string after all such shifts to s are applied.
 *
 */

function shiftingLetters(s: string, shifts: number[][]): string {
    /**
     * Idea is to use prefix sum to prepare no. of shift per char we need to perform.
     *
     * s = abcdefg [[1,5,1]] i.e rotate bcdef by 1
     *
     * step-1 prepare for prefix sum : Prepare an array such that when you perform
     * prefix sum it will generate the array where each idx represent the shift count
     *
     * prefixSum = []
     *
     * for interval: [1,5,1] => we prefix sum to look like [0,1,1,1,1,1,0]
     * to get to this : if the array is something like:
     * [0,1,0,0,0,0,0,-1] ==prefix-sum =>[0,1,1,1,1,1,0]
     *
     * so this mean for every interval:
     * interval: [1,5,1]
     * prefixSum[interval[0]]++
     * prefixSum[interval[1] + 1]--
     *
     * This would prepare the prefix array.
     *
     * next step: is perform a prefix sum on the array to get the actual no. of rotations per char.
     *
     */

    const charArray = s.split('').map((c) => c.charCodeAt(0));
    const prefixSum: number[] = new Array(charArray.length + 1).fill(0);

    // prepare prefix sum array , by iterative over intervals

    for (const shift of shifts) {
        if (shift[2] === 1) {
            // forward shift
            prefixSum[shift[0]]++;
            prefixSum[shift[1] + 1]--;
        } else {
            // if shift backwards it is oppsite
            prefixSum[shift[0]]--;
            prefixSum[shift[1] + 1]++;
        }
    }

    // perform prefixsum
    for (let i = 0; i < prefixSum.length; i++) {
        prefixSum[i] = (prefixSum?.[i - 1] ?? 0) + prefixSum[i];
    }

    const zCharCode = 'z'.charCodeAt(0);
    const aCharCode = 'a'.charCodeAt(0);
    const fixChar = (cCode: number): number => {
        if (cCode < aCharCode) {
            const diff = aCharCode - cCode;
            return zCharCode - diff + 1;
        } else if (cCode > zCharCode) {
            const diff = cCode - zCharCode;
            return aCharCode + diff - 1;
        }
        return cCode;
    };
    // perform the actual rotation.
    for (let i = 0; i < charArray.length; i++) {
        let cCode = charArray[i];
        let rotateCount = prefixSum[i];
        if (rotateCount > 0) {
            rotateCount = rotateCount % 26;
            // if rotateCount is 26 that means we are coming back to same char.
            cCode += rotateCount;
        } else {
            rotateCount = -(Math.abs(rotateCount) % 26);
            cCode += rotateCount;
        }
        charArray[i] = fixChar(cCode);
    }

    console.log(prefixSum);
    console.log(charArray);
    return String.fromCharCode(...charArray);
}

console.log(
    shiftingLetters('abc', [
        [0, 1, 0],
        [1, 2, 1],
        [0, 2, 1],
    ])
);
console.log(
    shiftingLetters('dztz', [
        [0, 0, 0],
        [1, 1, 1],
    ])
);

console.log(
    shiftingLetters('abc', [
        [0, 1, 0],
        // [1, 2, 1],
        // [0, 2, 1],
    ])
);
