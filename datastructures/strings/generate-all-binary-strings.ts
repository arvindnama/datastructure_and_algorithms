/**
 * Given a string containing of ‘0’, ‘1’ and ‘?’ wildcard characters,
 * generate all binary strings that can be formed
 * by replacing each wildcard character by ‘0’ or ‘1’.
 *
 *
 */

const generateAllBinaryString = (str: string): string[] => {
    const res: string[] = [];
    const generate = (str: string, currIdx: number) => {
        if (currIdx === str.length) {
            res.push(str);
            return;
        }

        if (str[currIdx] === '?') {
            generate(
                `${str.substring(0, currIdx)}0${str.substring(currIdx + 1)}`,
                currIdx + 1
            );
            generate(
                `${str.substring(0, currIdx)}1${str.substring(currIdx + 1)}`,
                currIdx + 1
            );
        } else {
            generate(str, currIdx + 1);
        }
    };
    generate(str, 0);
    return res;
};

console.log(
    'Generated all binary string',
    '1??0?101',
    generateAllBinaryString('1??0?101')
);
