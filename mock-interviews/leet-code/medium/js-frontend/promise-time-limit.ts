/**
 * Given an asynchronous function fn and a time t in milliseconds, return a new time limited version of the input function. fn takes arguments provided to the time limited function.

The time limited function should follow these rules:

If the fn completes within the time limit of t milliseconds, the time limited function should resolve with the result.
If the execution of the fn exceeds the time limit, the time limited function should reject with the string "Time Limit Exceeded".
 */

type Fn = (...params: any[]) => Promise<any>;

function timeLimit(fn: Fn, t: number): Fn {
    const timerStamp = Symbol('timer_output');
    const timer = (): Promise<symbol> =>
        new Promise((res) => setTimeout(() => res(timerStamp), t));

    return async function (...args: any[]): Promise<any> {
        const timerPromise = timer();
        const fnPromise = fn(...args);

        return Promise.race([timerPromise, fnPromise]).then((res) => {
            if (res === timerStamp) {
                return Promise.reject('Time Limit Exceeded');
            }
            return res;
        });
    };
}

const limited = timeLimit(async (n) => {
    await new Promise((res) => setTimeout(res, 100));
    return n * n;
}, 50);
limited(5).then(console.log).catch(console.log); // "Time Limit Exceeded" at t=100ms
