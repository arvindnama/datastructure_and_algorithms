/**
 * Given an array nums of n integers where nums[i] is in the range [1, n], return an array of all the integers in the range [1, n] that do not appear in nums.
 */

function findDisappearedNumbers(nums: number[]): number[] {
    const map: boolean[] = new Array(nums.length).fill(false);
    for (let i = 0; i < nums.length; i++) {
        map[nums[i] - 1] = true;
    }
    return map
        .map((found, idx) => ({ found, idx }))
        .filter(({ found }) => !found)
        .map(({ idx }) => idx + 1);
}

console.log(findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1]));
console.log(findDisappearedNumbers([1, 1]));
console.log(findDisappearedNumbers([1, 1, 1, 1]));
