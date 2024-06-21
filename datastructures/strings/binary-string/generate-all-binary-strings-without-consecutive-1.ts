/**
 * Generate all binary strings without consecutive 1’s
 *
 * start with 0 and generate next possible seq i.e 00 & 01
 * start with 1 and generate next possible seq i.e. 10
 * now repeat the generation until string length is k
 *
 * i.e. if lastChar is `1` -> next generate `10` and skip `11` as we don't need to generate consecutive numbers.
 * if lastChar is `0` -> next generate `00` and `01`
 *
 *
 */
const generateAllBinaryString = (k: number): string[] => {
    const generate = (s: string, res: string[]) => {
        if (s.length === k) res.push(s);
        else if (s[s.length - 1] === '0') {
            generate(`${s}0`, res);
            generate(`${s}1`, res);
        } else {
            generate(`${s}0`, res);
            // cannot generate with 1 ending call no consecutive nos can be 1
        }
    };

    const res: string[] = [];
    generate('0', res);
    generate('1', res);
    return res;
};

console.log(`Generate binary strings of length`, 3, generateAllBinaryString(3));
console.log(`Generate binary strings of length`, 4, generateAllBinaryString(4));
