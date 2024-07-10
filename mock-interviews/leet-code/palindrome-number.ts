/**
 * Given an integer x, return true if x is a
 * palindrome, and false otherwise.
 */

function isPalindrome(x: number): boolean {
    if (x < 0) return false; // negative numbers cannot be palindrome

    if (x < 9) return true; // single digit numbers are always palindrome

    // const getMSBDivider = (x: number): number => {
    //     let divider = 1000000000;
    //     let n = Math.floor(x / divider);
    //     while (n == 0) {
    //         divider = divider / 10;
    //         n = Math.floor(x / divider);
    //     }
    //     return divider;
    // };

    // let msbDivider = getMSBDivider(x);

    // while (x >= 10) {
    //     const msb = Math.floor(x / msbDivider);
    //     const lsb = x % 10;
    //     console.log(x, msb, lsb);
    //     if (msb !== lsb) return false; //not palindrome

    //     x = x - msb * msbDivider; // remove msb
    //     x = Math.floor(x / 10); // remove lsb

    //     msbDivider = msbDivider / 10; //update msb divider
    // }
    // return true;

    const digits: number[] = [];
    while (x > 0) {
        const lsb = x % 10;
        digits.unshift(lsb);
        x = Math.floor(x / 10);
    }

    let [i, j] = [0, digits.length - 1];
    while (i < j) {
        if (digits[i] !== digits[j]) return false;
        i++;
        j--;
    }

    return true;
}

console.log(isPalindrome(121));
console.log(isPalindrome(-121));
console.log(isPalindrome(10));
console.log(isPalindrome(101));
console.log(isPalindrome(1000011));
