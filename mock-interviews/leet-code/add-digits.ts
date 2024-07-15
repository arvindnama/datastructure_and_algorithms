/**
 * Given an integer num, repeatedly add all its digits until the result has only one digit, and return it.
 */

function addDigits(num: number): number {
    // const sumOfDigits = (num: number): number => {
    //     let sum = 0;
    //     while (num) {
    //         const r = num % 10;
    //         sum += r;
    //         num = Math.floor(num / 10);
    //     }
    //     return sum;
    // };

    // while (num > 9) {
    //     num = sumOfDigits(num);
    // }
    // return num;

    const numMod9 = num % 9;
    return num > 9
        ? // if num is multiples of 9 it will always be 0 but
          numMod9 === 0
            ? 9
            : numMod9
        : num;
}

console.log(addDigits(38));
console.log(addDigits(3));
console.log(addDigits(0));
console.log(addDigits(100));
console.log(addDigits(9));
console.log(addDigits(18));
console.log(addDigits(27));
