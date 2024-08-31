/**
 * Given an integer array nums, handle multiple queries of the following types:

Update the value of an element in nums.
Calculate the sum of the elements of nums between indices left and right inclusive where left <= right.
Implement the NumArray class:

NumArray(int[] nums) Initializes the object with the integer array nums.
void update(int index, int val) Updates the value of nums[index] to be val.
int sumRange(int left, int right) Returns the sum of the elements of nums between indices left and right inclusive (i.e. nums[left] + nums[left + 1] + ... + nums[right]).
 */

class NumArray {
    #prefixSum: number[] = [];

    private performPrefixSum(s: number) {
        for (let i = s; i < this.#prefixSum.length; i++) {
            this.#prefixSum[i] =
                (this.#prefixSum?.[i - 1] ?? 0) + this.#prefixSum[i];
        }
    }

    constructor(private nums: number[]) {
        this.#prefixSum = [...nums];
        this.performPrefixSum(0);
    }

    update(index: number, val: number): void {
        const diff = val - this.nums[index];
        this.nums[index] = val;
        for (let i = index; i < this.nums.length; i++) {
            this.#prefixSum[i] += diff;
        }
    }

    sumRange(left: number, right: number): number {
        return this.#prefixSum[right] - (this.#prefixSum?.[left - 1] ?? 0);
    }
}

const n = new NumArray([1, 3, 5]);
console.log(n.sumRange(0, 2));
n.update(1, 2);
console.log(n.sumRange(0, 2));
n.update(1, 4);
console.log(n.sumRange(0, 2));
