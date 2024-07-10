/**
 * Check if only right most & left most bits are set.
 *
 * any number which is power of 2 will have its only right most set and everything else 0
 * i.e.
 * 2 = 10
 * 4 = 100
 * 8 = 1000
 *
 * and n (power of 2) + 1 will have right most also set to 1
 *
 * in general for n to have only right&left most set , n-1 should be power of 2
 *
 */

const isLMRMSet = (n: number): boolean => {
    if (n === 1) return true;
    if (n == 2) return false;

    const isPowerOf2 = (n: number): boolean => !(n & (n - 1));

    return isPowerOf2(n - 1);
};

console.log('isLMRMSet:: 9', isLMRMSet(9));
console.log('isLMRMSet:: 15', isLMRMSet(15));
console.log('isLMRMSet:: 17', isLMRMSet(17));
