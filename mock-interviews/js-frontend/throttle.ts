/**
 * Throttling is a way/technique to restrict the number of function execution/call
 *
 * This will call/execute the specified function only after a given interval no matter how much you call it.
 */

const throttle = (
    fn: (...args: unknown[]) => unknown,
    limit: number
): ((...args: unknown[]) => unknown) => {
    let timer!: NodeJS.Timeout | null;

    return (...args: unknown[]) => {
        if (!timer) {
            // not yet invoke or wait period is completed
            fn(...args);
            timer = setTimeout(() => {
                timer = null;
            }, limit);
            return;
        }
        // avoid this call as it is called too early and we are not allowed
        // to invoke until the time period ends.
        console.warn('call ignored::', ...args);
    };
};

const fn = (s: any) => console.log(s);

const trottledFn = throttle(fn, 1000);
trottledFn('1: called');
trottledFn('not called');
trottledFn('not called');
trottledFn('not called');
trottledFn('not called');
setTimeout(() => trottledFn('2: called'), 1010);
