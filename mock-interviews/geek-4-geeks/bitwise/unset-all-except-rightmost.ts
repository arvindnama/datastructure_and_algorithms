/**
 * res = n & n - 1  will reset the rightmost bit
 * res ^ n will unset all other bits and set right most.
 */
const unsetAllExceptRightMost = (n: number): string => {
    return ((n & (n - 1)) ^ n).toString(2);
};

console.log(
    'Unset all except rightmost : 10100100:: ',
    unsetAllExceptRightMost(0b10100100)
);

console.log(
    'Unset all except rightmost : 10100100:: ',
    unsetAllExceptRightMost(0b10100100)
);
