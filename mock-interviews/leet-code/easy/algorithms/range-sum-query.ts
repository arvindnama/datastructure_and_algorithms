/**
 * Given an integer array nums, handle multiple queries of the following type:

Calculate the sum of the elements of nums between indices left and right inclusive where left <= right.
Implement the NumArray class:

NumArray(int[] nums) Initializes the object with the integer array nums.
int sumRange(int left, int right) Returns the sum of the elements of nums between indices left and right inclusive (i.e. nums[left] + nums[left + 1] + ... + nums[right]).
 */

class NumArray {
    private sumToIdx: number[] = [];
    constructor(nums: number[]) {
        this.sumToIdx[0] = nums[0];
        for (let i = 1; i < nums.length; i++) {
            this.sumToIdx[i] = this.sumToIdx[i - 1] + nums[i];
        }
    }

    sumRange(left: number, right: number): number {
        if (left == 0) return this.sumToIdx[right];
        return this.sumToIdx[right] - this.sumToIdx[left - 1];
    }
}

const numArr = new NumArray([-2, 0, 3, -5, 2, -1]);
console.log(numArr.sumRange(0, 2));
console.log(numArr.sumRange(2, 5));
console.log(numArr.sumRange(0, 5));
