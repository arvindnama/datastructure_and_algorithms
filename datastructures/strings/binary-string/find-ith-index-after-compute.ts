/**
 * Given a decimal number m, convert it into a binary string and apply n iterations. In each iteration, 0 becomes “01” and 1 becomes “10”. Find the (based on indexing) index character in the string after the nth iteration.
 */

const findChar = (m: number, n: number, i: number): string => {
    const numToBinary = (m: number): string => {
        let s = '';
        while (m) {
            s = `${m % 2}${s}`;
            m = Math.floor(m / 2);
        }
        return s;
    };

    let binaryString = numToBinary(m);
    for (let i = 0; i < n; i++) {
        let s1 = '';
        for (let i = 0; i < binaryString.length; i++) {
            s1 += binaryString[i] === '0' ? '01' : '10';
        }
        binaryString = s1;
    }
    return binaryString[i];
};

console.log('what crap computation : 5,2,3 ::: ', findChar(5, 2, 3));
console.log('what crap computation : 3,3,6 ::: ', findChar(3, 3, 6));
