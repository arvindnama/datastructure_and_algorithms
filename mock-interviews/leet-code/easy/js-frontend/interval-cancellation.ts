/**
 * Given a function fn, an array of arguments args, and an interval time t, return a cancel function cancelFn.

After a delay of cancelTimeMs, the returned cancel function cancelFn will be invoked.

setTimeout(cancelFn, cancelTimeMs)
The function fn should be called with args immediately and then called again every t milliseconds until cancelFn is called at cancelTimeMs ms.
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
    fn(...args);
    let timer: NodeJS.Timeout | undefined = setInterval(() => fn(...args), t);
    return () => {
        clearInterval(timer);
        timer = undefined;
    };
}

const result: Array<{
    time: number;
    returned: JSONValue;
}> = [];

const fn = (...args: JSONValue[]) => (args[0] as number) * 2;
const args = [4],
    t = 35,
    cancelTimeMs = 190;

const start = performance.now();

const log = (...argsArr: JSONValue[]) => {
    const diff = Math.floor(performance.now() - start);
    result.push({ time: diff, returned: fn(...argsArr) });
};

const cancel = cancellable(log, args, t);

setTimeout(cancel, cancelTimeMs);

setTimeout(
    () => {
        console.log(result); // [
        //     {"time":0,"returned":8},
        //     {"time":35,"returned":8},
        //     {"time":70,"returned":8},
        //     {"time":105,"returned":8},
        //     {"time":140,"returned":8},
        //     {"time":175,"returned":8}
        // ]
    },
    cancelTimeMs + t + 15
);
