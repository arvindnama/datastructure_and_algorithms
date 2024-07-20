/**
 * The Hamming distance between two integers is the number of positions at which the corresponding bits are different.

Given two integers x and y, return the Hamming distance between them.
 */

function hammingDistance(x: number, y: number): number {
    let hammingDistance = 0;
    while (x > 0 || y > 0) {
        const [lsbX, lsbY] = [x & 1, y & 1];
        if (lsbX !== lsbY) hammingDistance++;

        x = x >> 1;
        y = y >> 1;
    }

    return hammingDistance;
}

console.log(hammingDistance(1, 4));
console.log(hammingDistance(3, 1));
console.log(hammingDistance(16, 1));
