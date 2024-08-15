/**
 * Given a number N having only one ‘1’ and all other ’0’s in its binary representation, find position of the only set bit. If there are 0 or more than 1 set bit the answer should be -1. Position of  set bit '1' should be counted starting with 1 from LSB side in binary representation of the number.
 */

const findPos = (n: number): number => {
    let [firstPos, c, setBits] = [-1, 0, 0];

    while (n) {
        c++;
        if ((n & 1) === 1) {
            firstPos = c;
            setBits++;
        }
        n >>= 1;
    }
    return setBits == 0 || setBits > 1 ? -1 : firstPos;
};

console.log(findPos(2));
console.log(findPos(5));
