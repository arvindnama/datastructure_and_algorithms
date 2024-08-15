/**
 * Given a number x, reverse its binary form and return the answer in decimal.
 */

const reverse = (n: number): number => {
    let [msb, t] = [-1, n];
    while (t) {
        msb++;
        t >>= 1;
    }
    return n << (30 - msb);
};

console.log(reverse(0b1).toString(2));
console.log(reverse(0b0101).toString(2));
console.log(reverse(0b10101).toString(2));
console.log(reverse(0b1111101).toString(2));
