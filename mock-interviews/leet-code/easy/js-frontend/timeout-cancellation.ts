/**
 * Given a function fn, an array of arguments args, and a timeout t in milliseconds, return a cancel function cancelFn.

After a delay of cancelTimeMs, the returned cancel function cancelFn will be invoked.

setTimeout(cancelFn, cancelTimeMs)
Initially, the execution of the function fn should be delayed by t milliseconds.

If, before the delay of t milliseconds, the function cancelFn is invoked, it should cancel the delayed execution of fn. Otherwise, if cancelFn is not invoked within the specified delay t, fn should be executed with the provided args as arguments.
 */

type JSONValue =
    | null
    | boolean
    | number
    | string
    | JSONValue[]
    | { [key: string]: JSONValue };
type Fn = (...args: JSONValue[]) => void;

function cancellable(fn: Fn, args: JSONValue[], t: number): () => void {
    let timer: NodeJS.Timeout | undefined = setTimeout(() => fn(...args), t);

    return () => {
        clearTimeout(timer);
        timer = undefined;
    };
}

const result: Array<{
    time: number;
    returned: JSONValue;
}> = [];

const fn = (...args: JSONValue[]) => (args[0] as number) * (args[1] as number);

const args = [2, 4],
    t = 30,
    cancelTimeMs = 100;
const start = performance.now();

const log = (...argsArr: JSONValue[]) => {
    const diff = Math.floor(performance.now() - start);
    result.push({ time: diff, returned: fn(...argsArr) });
};

const cancel = cancellable(log, args, t);
const maxT = Math.max(t, cancelTimeMs);

setTimeout(cancel, cancelTimeMs);
setTimeout(() => {
    console.log(result); // [{"time":20,"returned":10}]
}, maxT + 15);
