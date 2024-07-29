/**
 * Seven different symbols represent Roman numerals with the following values:
I	1
V	5
X	10
L	50
C	100
D	500
M	1000
 */

function intToRoman(num: number): string {
    const map: { [key in number]: string } = {
        1000: 'M',
        900: 'CM',
        500: 'D',
        400: 'CD',
        100: 'C',
        90: 'XC',
        50: 'L',
        40: 'XL',
        10: 'X',
        9: 'IX',
        5: 'V',
        4: 'IV',
        1: 'I',
    };

    let roman = '';
    const keys = Object.keys(map)
        .map((k) => parseInt(k))
        .sort((a, b) => b - a);

    const findFirstBig = (num: number): number => {
        for (let i = 0; i < keys.length; i++) {
            if (num >= keys[i]) return keys[i];
        }
        return -1;
    };

    while (num > 0) {
        const msb = findFirstBig(num);
        roman += map[msb];
        num = num - msb;
    }
    return roman;
}

// console.log(intToRoman(3749));
// console.log(intToRoman(58));
// console.log(intToRoman(1994));

for (let i = 1; i < 4000; i++) {
    console.log(i, '-->', intToRoman(i));
}
