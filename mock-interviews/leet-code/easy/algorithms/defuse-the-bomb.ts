/**
 * You have a bomb to defuse, and your time is running out! Your informer will provide you with a circular array code of length of n and a key k.

To decrypt the code, you must replace every number. All the numbers are replaced simultaneously.

If k > 0, replace the ith number with the sum of the next k numbers.
If k < 0, replace the ith number with the sum of the previous k numbers.
If k == 0, replace the ith number with 0.
As code is circular, the next element of code[n-1] is code[0], and the previous element of code[0] is code[n-1].

Given the circular array code and an integer key k, return the decrypted code to defuse the bomb!
 */

function decrypt(code: number[], k: number): number[] {
    /**
     * [5, 7, 1, 4] k = 3
     *
     * sumOfK = 5 + 7 + 1
     * i 0 -> n
     * 5 -> sumOfK - 5 + nextk
     */

    const decrptyCommon = (code: number[], result: number[]) => {
        // this assumes k is always positive
        for (let i = 0; i < code.length; i++) {
            if (k === 0) {
                result[i] = 0;
                continue;
            }
            let [sum, start, counter] = [0, i + 1, 0];
            while (counter < k) {
                sum += code[start % code.length];
                start++;
                counter++;
            }
            result[i] = sum;
        }
    };

    const res: number[] = [];
    if (k > 0) {
        decrptyCommon(code, res);
    } else {
        code.reverse();
        k = Math.abs(k);
        decrptyCommon(code, res);
        res.reverse();
    }

    return res;
}

console.log(decrypt([5, 7, 1, 4], 3));
console.log(decrypt([1, 2, 3, 4], 0));
console.log(decrypt([2, 4, 9, 3], -2));
