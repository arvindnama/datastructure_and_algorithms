/**
 * Given a number N. Find the length of the longest consecutive 1s in its binary representation.
 */

const longestConsecutive1 = (n: number): number => {
    let [max, count] = [0, 0];
    while (n) {
        if ((n & 1) === 1) count++;
        else {
            max = Math.max(max, count);
            count = 0;
        }
        n >>= 1;
    }
    return Math.max(max, count);
};

console.log(longestConsecutive1(0b1110));
console.log(longestConsecutive1(0b11011110));
