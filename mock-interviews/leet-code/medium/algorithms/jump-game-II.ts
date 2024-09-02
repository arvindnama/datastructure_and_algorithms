/**
 * You are given a 0-indexed array of integers nums of length n. You are initially positioned at nums[0].

Each element nums[i] represents the maximum length of a forward jump from index i. In other words, if you are at nums[i], you can jump to any nums[i + j] where:

0 <= j <= nums[i] and
i + j < n
Return the minimum number of jumps to reach nums[n - 1]. The test cases are generated such that you can reach nums[n - 1].
 */

function jump(nums: number[]): number {
    /**
     *  start from [0],j,c=0
     *   i can jump from 1-j
     *  for each jump as you move fwd (++c) check if you reach n-1 if yes
     * stop and keep tack of jumpCount the min is returned.
     */

    const n = nums.length;
    const cache: { [k in number]: number } = {};
    const traverse = (idx: number, count: number) => {
        if (idx === n - 1) {
            return count;
        }

        if (cache[idx] !== undefined) {
            return cache[idx];
        }
        const maxJumps = nums[idx];
        let minJumps = Number.MAX_VALUE;
        for (let i = 1; i <= maxJumps; i++) {
            if (idx + i < n) {
                minJumps = Math.min(minJumps, traverse(idx + i, 1));
            }
        }

        return (cache[idx] = minJumps + count);
    };
    return traverse(0, 0);
}

console.log(jump([2, 3, 1, 1, 4]));
console.log(jump([2, 3, 0, 1, 4]));
console.log(
    jump([
        5, 6, 4, 4, 6, 9, 4, 4, 7, 4, 4, 8, 2, 6, 8, 1, 5, 9, 6, 5, 2, 7, 9, 7,
        9, 6, 9, 4, 1, 6, 8, 8, 4, 4, 2, 0, 3, 8, 5,
    ])
);
