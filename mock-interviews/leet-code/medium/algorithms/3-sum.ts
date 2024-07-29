/**
 * Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.
 */

function threeSum(nums: number[]): number[][] {
    const map: { [key in number]: Array<number[]> } = {};

    for (let i = 0; i < nums.length; i++) {
        for (let j = i; j < nums.length; j++) {
            if (i !== j) {
                const sum = nums[i] + nums[j];
                const key = 0 - sum;
                map[key] = map[key] || [];
                map[key].push([i, j]);
            }
        }
    }

    let res: Array<number[]> = [];
    for (let k = 0; k < nums.length; k++) {
        if (!map[nums[k]]) continue;
        res = map[nums[k]]
            .filter(([i, j]) => k > i && k > j)
            .reduce((acc, [i, j]) => {
                const triplet = [nums[i], nums[j], nums[k]].sort();
                if (
                    acc.find(
                        ([a, b, c]) =>
                            a === triplet[0] &&
                            b === triplet[1] &&
                            c === triplet[2]
                    )?.length
                )
                    return acc;
                return [...acc, triplet];
            }, res);
    }
    return res;
}

console.log(threeSum([-1, 0, 1, 2, -1, -4]));
console.log(threeSum([0, 1, 1]));
console.log(threeSum([0, 0, 0]));
