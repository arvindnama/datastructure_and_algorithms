/**
 * A child is running up a staircase with n steps and can hop either 1 step, 2 steps, or 3 steps at a time. Implement a method to count how many possible ways the child can run up the stairs.
 *
 * https://www.geeksforgeeks.org/count-ways-reach-nth-stair-using-step-1-2-3
 */

const countStepToReachN = (n: number): number => {
    if (n === 0) return 0;
    if (n === 1) return 1;
    if (n === 2) return 2;
    if (n === 3) return 4;

    const map = ((countStepToReachN as any as FuncWithMap).map =
        (countStepToReachN as any as FuncWithMap).map || {});

    if ((map[n] as number) >= 0) return map[n] as number;
    return (map[n] =
        countStepToReachN(n - 1) +
        countStepToReachN(n - 2) +
        countStepToReachN(n - 3));
};

console.log(countStepToReachN(5));
console.log(countStepToReachN(4));

const countStepToReachN2 = (n: number): number => {
    const arr = [0, 1, 2, 4];

    if (n <= 3) return arr[n];
    for (let i = 4; i <= n; i++) {
        arr[i] = arr[i - 1] + arr[i - 2] + arr[i - 3];
    }

    return arr[n];
};

console.log(countStepToReachN2(5));
console.log(countStepToReachN2(4));
