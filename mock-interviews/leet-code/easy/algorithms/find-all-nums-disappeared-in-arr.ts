/**
 * Given an array nums of n integers where nums[i] is in the range [1, n], return an array of all the integers in the range [1, n] that do not appear in nums.
 */

function findDisappearedNumbers(nums: number[]): number[] {
    const dups: number[] = [];

    for (let i = 0; i < nums.length; i++) {
        const iDest = nums[i] - 1;
        if (nums[i] !== i + 1 && nums[iDest] !== nums[i]) {
            [nums[i], nums[iDest]] = [nums[iDest], nums[i]];
            i--;
        }
    }

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== i + 1) dups.push(i + 1);
    }

    return dups;
}

console.log(findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1]));
console.log(findDisappearedNumbers([1, 1]));
console.log(findDisappearedNumbers([1, 1, 1, 1]));
