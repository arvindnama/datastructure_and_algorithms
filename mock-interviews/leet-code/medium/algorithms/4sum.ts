/**
 * Given an array nums of n integers, return an array of all the unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that:

0 <= a, b, c, d < n
a, b, c, and d are distinct.
nums[a] + nums[b] + nums[c] + nums[d] == target
You may return the answer in any order.
 */

function fourSum(nums: number[], target: number): number[][] {
    nums.sort((a, b) => a - b);

    const result: Array<number[]> = [];
    for (let a = 0; a < nums.length; a++) {
        if (a > 0 && nums[a] === nums[a - 1]) continue;
        for (let b = a + 1; b < nums.length; b++) {
            if (b > a + 1 && nums[b] === nums[b - 1]) continue;
            let [c, d] = [b + 1, nums.length - 1];
            while (c < d) {
                const sum = nums[a] + nums[b] + nums[c] + nums[d];
                if (sum === target) {
                    result.push([nums[a], nums[b], nums[c], nums[d]]);
                    c++;
                    while (nums[c] === nums[c - 1] && c < d) c++;
                } else if (sum < target) c++;
                else d--;
            }
        }
    }
    return result;
}

console.log(fourSum([1, 0, -1, 0, -2, 2], 0));
console.log(fourSum([2, 2, 2, 2, 2], 8));
