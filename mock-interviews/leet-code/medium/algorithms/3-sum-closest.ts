/**
 * Given an integer array nums of length n and an integer target, find three integers in nums such that the sum is closest to target.

Return the sum of the three integers.

You may assume that each input would have exactly one solution.
 */

function threeSumClosest(nums: number[], target: number): number {
    nums.sort((a, b) => a - b);

    let res!: number;
    const getGap = (a: number, b = target): number => (a > b ? a - b : b - a);
    for (let i = 0; i < nums.length; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        let [j, k] = [i + 1, nums.length - 1];
        while (j < k) {
            const sum = nums[i] + nums[j] + nums[k];
            if (sum === target) return target;
            else if (sum < target) j++;
            else k--;
            if (res === undefined) {
                res = sum;
                continue;
            }
            const [sGap, rGap] = [getGap(sum), getGap(res)];
            if (sGap < rGap) res = sum;
        }
    }
    return res;
}

console.log(threeSumClosest([-1, 2, 1, -4], 1));
console.log(threeSumClosest([0, 0, 0], 1));
console.log(threeSumClosest([1, 1, 2, 3], 5));
console.log(threeSumClosest([1, 1, 1, 0], -100));
