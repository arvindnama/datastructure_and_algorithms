/**
 * Given a number in its binary form find if the given binary number is a multiple of 3. It is recommended to finish the task using one traversal of input binary number.
 */

const isMultipleOf3 = (n: string): boolean => {
    let num = 0;
    for (let i = n.length - 1; i >= 0; i--) {
        num += +n[i] * 2 ** (n.length - 1 - i);
    }
    return num % 3 === 0;
};

console.log(isMultipleOf3('0011'));
console.log(isMultipleOf3('101'));
console.log(isMultipleOf3('110'));
console.log(isMultipleOf3('1001'));
