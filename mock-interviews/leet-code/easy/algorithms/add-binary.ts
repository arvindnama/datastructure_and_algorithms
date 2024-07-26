/**
 * Given two binary strings a and b, return their sum as a binary string.
 */

function addBinary(a: string, b: string): string {
    let carry = 0;
    let res = '';
    let [i, j] = [a.length - 1, b.length - 1];
    while (i >= 0 || j >= 0) {
        const aD = i >= 0 ? parseInt(a[i]) : 0;
        const bD = j >= 0 ? parseInt(b[j]) : 0;

        let nD = aD + bD + carry;
        carry = nD >= 2 ? 1 : 0;
        nD = nD % 2;
        res = `${nD}${res}`;
        i--;
        j--;
    }
    if (carry) {
        res = `${carry}${res}`;
    }

    return res;
}

console.log(addBinary('11', '1'));
console.log(addBinary('1010', '1011'));
console.log(addBinary('1111', '1'));
