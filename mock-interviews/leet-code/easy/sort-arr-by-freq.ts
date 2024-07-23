/**
 * Given an array of integers nums, sort the array in increasing order based on the frequency of the values. If multiple values have the same frequency, sort them in decreasing order.

Return the sorted array.
 */

function frequencySort(nums: number[]): number[] {
    const hashMap: { [k in number]: number } = {};

    for (let i = 0; i < nums.length; i++) {
        hashMap[nums[i]] = hashMap[nums[i]] || 0;
        hashMap[nums[i]]++;
    }

    return nums.sort((a, b) => {
        return hashMap[a] === hashMap[b]
            ? b - a // if a & b has same freq, sort them in dec order
            : hashMap[a] - hashMap[b]; // if not inc order of freq
    });
}

console.log(frequencySort([1, 1, 2, 2, 2, 3]));
console.log(frequencySort([2, 3, 1, 3, 2]));
console.log(frequencySort([-1, 1, -6, 4, 5, -6, 1, 4, 1]));
