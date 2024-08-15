/**
 * Given a number N. The task is to check whether it is sparse or not. A number is said to be a sparse number if no two or more consecutive bits are set in the binary representation.
 */

const isSparse = (n: number): boolean => {
    let isPerviousSet = false;
    while (n) {
        if ((n & 1) === 1 && isPerviousSet) return false;
        else if ((n & 1) === 1) isPerviousSet = true;
        n >>= 1;
    }
    return true;
};

const isSparse2 = (n: number): boolean => {
    return (n & (n >> 1)) === 0;
};

console.log(isSparse(2));
console.log(isSparse(3));

console.log(isSparse2(2));
console.log(isSparse2(3));
