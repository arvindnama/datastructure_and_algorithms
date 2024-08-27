/**
 * You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?


 */

const climbStairs = (n: number): number => {
    if (n <= 0) return 0;
    if (n === 1) return 1;
    if (n === 2) return 2;
    const cache = ((climbStairs as any).cache =
        (climbStairs as any).cache || {});
    if (cache[n]) return cache[n];
    return (cache[n] = climbStairs(n - 1) + climbStairs(n - 2));
};

console.log(climbStairs(1));
console.log(climbStairs(2));
console.log(climbStairs(3));
console.log(climbStairs(45));
