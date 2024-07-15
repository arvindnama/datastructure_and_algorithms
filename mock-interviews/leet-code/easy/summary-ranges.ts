/**

You are given a sorted unique integer array nums.

A range [a,b] is the set of all integers from a to b (inclusive).

Return the smallest sorted list of ranges that cover all the numbers in the array exactly. That is, each element of nums is covered by exactly one of the ranges, and there is no integer x such that x is in one of the ranges but not in nums.

Each range [a,b] in the list should be output as:

"a->b" if a != b
"a" if a == b
 */

function summaryRanges(nums: number[]): string[] {
    if (!nums.length) return [];
    const rangeArr: string[] = [];
    let rangeStart = nums[0];

    const getRange = (s: number, e: number): string =>
        s < e ? `${s}->${e}` : `${s}`;
    for (let i = 1; i < nums.length; i++) {
        if (nums[i - 1] + 1 === nums[i]) {
            continue;
        }
        const range = getRange(rangeStart, nums[i - 1]);
        rangeStart = nums[i];
        rangeArr.push(range);
    }
    const range = getRange(rangeStart, nums[nums.length - 1]);
    rangeArr.push(range);
    return rangeArr;
}

console.log(summaryRanges([0, 1, 2, 4, 5, 7]));
console.log(summaryRanges([0, 2, 3, 4, 6, 8, 9]));
console.log(summaryRanges([-2, -1, 0, 3, 5, 6, 7, 8, 9]));
console.log(summaryRanges([]));
