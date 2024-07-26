/***
 * You are given a license key represented as a string s that consists of only alphanumeric characters and dashes. The string is separated into n + 1 groups by n dashes. You are also given an integer k.

We want to reformat the string s such that each group contains exactly k characters, except for the first group, which could be shorter than k but still must contain at least one character. Furthermore, there must be a dash inserted between two groups, and you should convert all lowercase letters to uppercase.

Return the reformatted license key.
 */

function licenseKeyFormatting(s: string, k: number): string {
    const split = s.split('-');
    let frmtKey = '';
    const rem = split.join('');
    let [i, j] = [0, k];
    while (i < rem.length) {
        const idx = rem.length - 1 - i;
        frmtKey = rem[idx].toUpperCase() + frmtKey;
        if (j === 1 && i !== rem.length - 1) {
            frmtKey = '-' + frmtKey;
            j = k;
        } else {
            j--;
        }
        i++;
    }

    return frmtKey;
}

console.log(licenseKeyFormatting('5F3Z-2e-9-w', 4));
console.log(licenseKeyFormatting('2-5g-3-J', 2));
console.log(licenseKeyFormatting('2-4A0r7-4k', 4));
