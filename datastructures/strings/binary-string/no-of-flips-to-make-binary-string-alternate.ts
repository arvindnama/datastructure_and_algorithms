/**
 * Given a binary string, that is it contains only 0s and 1s. We need to make this string a sequence of alternate characters by flipping some of the bits, our goal is to minimize the number of bits to be flipped.
 */

/**
 * For an alternating binary string , the string can start with either 1 or 0
 *  for each case count the no. of flips needed and take the minimum
 */
const noOfFlips = (str: string): number => {
    let [expected, unexpected] = ['0', '1'];
    let [noOfFlipsIfZero, noOfFlipsIfOne] = [0, 0];

    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) === expected) {
            noOfFlipsIfOne++;
        } else {
            noOfFlipsIfZero++;
        }
        [expected, unexpected] = [unexpected, expected];
    }
    return Math.min(noOfFlipsIfOne, noOfFlipsIfZero);
};

console.log('No. of flips to make all same', '001', noOfFlips('001'));
console.log(
    'No. of flips to make all same',
    '0001010111',
    noOfFlips('0001010111')
);

console.log(
    'No. of flips to make all same',
    '101010110',
    noOfFlips('101010110')
);
