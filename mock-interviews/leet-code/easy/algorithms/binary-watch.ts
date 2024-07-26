/**
 * A binary watch has 4 LEDs on the top to represent the hours (0-11), and 6 LEDs on the bottom to represent the minutes (0-59). Each LED represents a zero or one, with the least significant bit on the right.

For example, the below binary watch reads "4:51".
 */

function readBinaryWatch(turnedOn: number): string[] {
    const getBitCount = (n: number): number[] => {
        const res: number[] = [0, 1];
        for (let i = 2; i <= n; i++) {
            res[i] = i % 2 == 0 ? res[i / 2] : 1 + res[Math.floor(i / 2)];
        }
        return res;
    };
    const bitCountArr = getBitCount(12 * 64 + 60); // 1111:111111 (max base 10 representation of binary watch)
    // generate all possible number representation from 0hrs to 12hrs 60 mins
    // and select only those that fix the turnedOn count.

    const times: string[] = [];
    for (let h = 0; h < 12; h++) {
        for (let m = 0; m < 60; m++) {
            // h*64+m : will give the base 10 representation of time h:mm
            if (bitCountArr[h * 64 + m] === turnedOn) {
                times.push(`${h}:${m.toString().padStart(2, '0')}`);
            }
        }
    }
    return times;
}

console.log(readBinaryWatch(1));
console.log(readBinaryWatch(2));
console.log(readBinaryWatch(9));
console.log(readBinaryWatch(0));
