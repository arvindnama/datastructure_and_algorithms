/**
 * You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.

Return true if you can reach the last index, or false otherwise.
 */

function canJump(nums: number[]): boolean {
    /**
     * goal is to reach from 0 to n-1
     * g = n-1 , if i can reach g from g-1 , then i can shift my goal by g-1 and recurse
     */

    const n = nums.length - 1;
    let [goal, pos] = [n - 1, n - 2];
    while (goal > 0 && pos > -1) {
        // as pos reaches -1 mean i dont have a solution
        const maxJumpsFromPos = nums[pos];
        const canJump = maxJumpsFromPos > 1; // i just need 1 move
        if (canJump) {
            // move goal post & start pos
            goal = goal - 1; // or pos;
            pos = goal - 1;
        } else {
            // goal post remains same, but let me try from one pos beyond
            pos = pos - 1;
        }
    }

    return goal === 0;
}

console.log(canJump([2, 3, 1, 1, 4]));
console.log(canJump([3, 2, 1, 0, 4]));
console.log(canJump([2, 0, 0]));
console.log(canJump([0, 1, 0]));
