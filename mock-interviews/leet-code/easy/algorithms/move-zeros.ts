/**
 * Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.

Note that you must do this in-place without making a copy of the array.
 */

function moveZeroes(nums: number[]): void {
    nums.sort((a, b) => {
        if (a == 0 && b !== 0) return +1;
        else if (b == 0 && a !== 0) return -1;
        else if (b == 0 && a === 0) return 0;
        else return 0;
    });
}

let nums = [0, 1, 0, 3, 12];
moveZeroes(nums);
console.log(nums);

nums = [0];
moveZeroes(nums);
console.log(nums);

nums = [0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7];
moveZeroes(nums);
console.log(nums);
