/**
 * Given a binary array nums, return the maximum number of consecutive 1's in the array.
 */

function findMaxConsecutiveOnes(nums: number[]): number {
    let [max, curMax] = [0, 0];
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) {
            max = Math.max(max, curMax);
            curMax = 0;
            continue;
        }
        curMax++;
    }
    return Math.max(curMax, max);
}

console.log(findMaxConsecutiveOnes([1, 1, 0, 1, 1, 1]));
console.log(findMaxConsecutiveOnes([1, 0, 1, 1, 0, 1]));
console.log(findMaxConsecutiveOnes([1, 1, 1, 1, 0, 1]));
