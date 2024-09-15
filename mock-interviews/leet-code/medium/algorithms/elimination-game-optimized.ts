/**
 * You have a list arr of all integers in the range [1, n] sorted in a strictly increasing order. Apply the following algorithm on arr:

Starting from left to right, remove the first number and every other number afterward until you reach the end of the list.
Repeat the previous step again, but this time from right to left, remove the rightmost number and every other number from the remaining numbers.
Keep repeating the steps again, alternating left to right and right to left, until a single number remains.
Given the integer n, return the last number that remains in arr.
 */

function lastRemaining(n: number): number {
    /**
     *  1,2,3,4,5,6
     *
     * lTOR  elimination == RtoL elimination
     * 1,2,3,4,5,6 = ltoR = 1,3,5
     * 6,5,4,3,2,1 = Rtol= 5,3,1
     *
     *
     * 1,2,3,4,5,6 = After 1st => 2,4,6 = 2 * (1,2,3)
     * f(6,left) = 2 * f(3, right)
     *
     * Equation-1: f(n, left) = 2 * f(n/2, right)
     *
     * let
     * f((1,2,3....n), left) =  f(n,left) = k;
     * replace val with n+1 - val
     * f((n+1-1,...n+1 - n), left) =   n + 1 - k;
     * f((n,n-1...1), left) =   n + 1 - f(n,left);
     *
     * equation-2: f(n, right) = n + 1 - f(n,left)
     *
     * f(n, left) = 2 * f(n/2, right)
     * f(n, right) = n + 1 - f(n,left)
     *
     * f(n, left) = 2 *  (n/2 + 1 - f(n/2,left))
     */

    if (n === 1) return n;

    return 2 * (Math.floor(n / 2) + 1 - lastRemaining(Math.floor(n / 2)));
}

console.log(lastRemaining(9));
console.log(lastRemaining(6));
