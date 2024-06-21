/**
 * Given a string consisting only of 1’s and 0’s. In one flip we can change any continuous sequence of this string. Find this minimum number of flips so the string consist of same characters only.
 */

const minFlips = (str: string): number => {
    const map: { [key in string]: number } = {
        '0': 0,
        '1': 0,
    };

    for (let i = 0; i < str.length; i++) {
        if (i === str.length - 1 || str.charAt(i) != str.charAt(i + 1)) {
            map[str.charAt(i)]++;
        }
    }

    return Math.min(map[0], map[1]);
};

console.log(
    'Min flips to make all same',
    '00011110001110',
    minFlips('00011110001110')
);

console.log(
    'Min flips to make all same',
    '010101100011',
    minFlips('010101100011')
);
