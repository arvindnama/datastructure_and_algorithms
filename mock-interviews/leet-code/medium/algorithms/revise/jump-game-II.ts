/**
 * You are given a 0-indexed array of integers nums of length n. You are initially positioned at nums[0].

Each element nums[i] represents the maximum length of a forward jump from index i. In other words, if you are at nums[i], you can jump to any nums[i + j] where:

0 <= j <= nums[i] and
i + j < n
Return the minimum number of jumps to reach nums[n - 1]. The test cases are generated such that you can reach nums[n - 1].
 */

function jump(nums: number[]): number {
    /**
     * [2,3,1,1,4]:
     * from 2 --> 3 ---> 1 ---> 1 (from 2 - 4 : 3 Or it is 1 + from(3 - 4))
     *               ---> 1 ---> 4 (from 2 - 4 : 2 Or it is 1 + from(3 - 4))
     *               ---> 4 (1) (from 2 - 4 : 1 Or it is 1 + from(3 - 4))
     *                  ---> (from 2 -- 4 : 1 + Min(3,2,1) i.e. 1 + Min(all sols from 3))
     *        --> 1
     */
    const cache: { [k in number]: number } = {};
    const jumpPos = (curIdx: number, count: number): number => {
        if (curIdx >= nums.length) return Number.MAX_VALUE; // not possible to reach here.
        if (curIdx === nums.length - 1) {
            return count;
        }

        const maxJumpFromCur = nums[curIdx];
        const jmpSolutionsFromCur: number[] = [];

        if (cache[curIdx] > 0) {
            return cache[curIdx];
        }

        for (let i = 1; i <= maxJumpFromCur; i++) {
            jmpSolutionsFromCur.push(jumpPos(i + curIdx, 1)); // get solu from curIdx as start;
        }
        const bestSolFromCurIdx = Math.min(...jmpSolutionsFromCur);
        return (cache[curIdx] =
            bestSolFromCurIdx === Number.MAX_VALUE
                ? Number.MAX_VALUE // no solution from here , so stop.
                : count + bestSolFromCurIdx); // there is a solution that is best from here.
    };

    return jumpPos(0, 0);
}

console.log(jump([2, 3, 1, 1, 4]));
console.log(jump([2, 3, 0, 1, 4]));
console.log(
    jump([
        5, 6, 4, 4, 6, 9, 4, 4, 7, 4, 4, 8, 2, 6, 8, 1, 5, 9, 6, 5, 2, 7, 9, 7,
        9, 6, 9, 4, 1, 6, 8, 8, 4, 4, 2, 0, 3, 8, 5,
    ])
);
