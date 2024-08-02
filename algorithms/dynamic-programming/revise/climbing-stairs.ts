/**
 * There are n stairs, a person standing at the bottom wants to climb stairs to reach the nth stair. The person can climb either 1 stair or 2 stairs at a time, the task is to count the number of ways that a person can reach at the top.
 */

const climbingStairs = (n: number): number => {
    /**
     * test consider i am on top at nth stair .
     * to reach here i can get in n-1 or n-2 ways
     * there is only 1 way to reach top if n === 1
     * there are 2 ways to reach top if n == 1
     */
    const map = ((climbingStairs as any as FuncWithMap).map =
        (climbingStairs as any as FuncWithMap).map || {});

    if (n === 1) return 1;
    if (n === 2) return 2;

    if (map[n]) return map[n] as number;
    return (map[n] = climbingStairs(n - 1) + climbingStairs(n - 2));
};

console.log(climbingStairs(1));
console.log(climbingStairs(2));
console.log(climbingStairs(4));
