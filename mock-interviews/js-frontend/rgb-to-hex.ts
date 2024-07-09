/**
 * In this question, you need to create a function rgbToHex that converts RGB format to HEX format.
 */

const rgbToHex = (r: string, g: string, b: string): string => {
    'use strict';
    const toInt = (s: string): number => {
        try {
            const res = parseInt(s, 10);
            return res >= 0 ? Math.min(res, 255) : -1;
        } catch {
            return -1;
        }
    };

    const toHex = (int: number): string => {
        let hex = int.toString(16).toUpperCase();
        if (hex.length !== 2) {
            hex = `${'0'.repeat(2 - hex.length)}${hex}`;
        }
        return hex;
    };

    const [rInt, gInt, bInt] = [toInt(r), toInt(g), toInt(b)];
    if (rInt === -1 || gInt === -1 || bInt === -1) {
        return '';
    }

    const hex = `#${toHex(rInt)}${toHex(gInt)}${toHex(bInt)}`;
    return hex;
};

console.log('Running tests');

console.assert(
    rgbToHex('255', '255', '255') === '#FFFFFF',
    'value should be #FFFFFF'
);

console.assert(
    rgbToHex('0', '0', '0') === '#000000',
    'value should be #000000'
);

console.assert(
    rgbToHex('186', '218', '85') == '#BADA55',
    'value should be #BADA55'
);

console.assert(
    rgbToHex('256', '255', '255') === '#FFFFFF',
    'value should be #FFFFFF'
);

console.log('All tests done');
