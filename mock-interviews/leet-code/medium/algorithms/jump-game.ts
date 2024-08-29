/**
 * You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.

Return true if you can reach the last index, or false otherwise.
 */

function canJump(nums: number[]): boolean {
    /**
     * lets have the goalpost set to n-1
     * if we can reach g from g - 1 position
     * then we can move g to g-1 & repeat till g == 0
     * if g cannot be reached from g -1 then g remains but
     * pos changes from g - 1 to g - 2
     */
    let g = nums.length - 1;
    let pos = g - 1;

    while (g > 0 && pos > -1) {
        let reachable = false;
        const maxJumps = nums[pos];
        for (let i = 1; i <= maxJumps; i++) {
            if (i + pos === g) {
                reachable = true;
                break;
            }
        }
        if (reachable) {
            g = pos;
        }
        pos = pos - 1;
    }
    return g === 0;
}

console.log(canJump([2, 3, 1, 1, 4]));
console.log(canJump([3, 2, 1, 0, 4]));
console.log(canJump([2, 0, 0]));
