/**
 * Given a binary input that represents binary representation of positive number n, find a binary representation of n+1.
 */

const nextNo = (n: string): string => {
    let next = '';
    let carry = '1';
    for (let i = n.length - 1; i >= 0; i--) {
        if (n.charAt(i) === '0') {
            next = `${carry}${next}`;
            carry = '0';
        } else if (n.charAt(i) === '1' && carry == '1') {
            next = `0${next}`;
        } else {
            next = `1${next}`;
        }
    }
    return carry == '1' ? `${carry}${next}` : next;
};

console.log('next ', '0', nextNo('0'));
console.log('next ', '1', nextNo('1'));
console.log('next ', '100', nextNo('100'));
console.log('next ', '101', nextNo('101'));
console.log('next ', '111', nextNo('111'));
