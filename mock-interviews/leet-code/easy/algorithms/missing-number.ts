/**
 * Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.
 */

function missingNumber(nums: number[]): number {
    let totalSum = 0;
    for (let i = 1; i <= nums.length; i++) {
        totalSum += i;
    }

    for (let i = 0; i < nums.length; i++) {
        totalSum -= nums[i];
    }

    return totalSum;
}

console.log(missingNumber([0, 1, 3]));
console.log(missingNumber([2, 1, 3]));
console.log(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1]));
console.log(missingNumber([0, 1]));
console.log(missingNumber([0]));
