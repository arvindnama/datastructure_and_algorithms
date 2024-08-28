/**
 * Sometimes you have a long running task, and you may wish to cancel it before it completes. To help with this goal, write a function cancellable that accepts a generator object and returns an array of two values: a cancel function and a promise.

You may assume the generator function will only yield promises. It is your function's responsibility to pass the values resolved by the promise back to the generator. If the promise rejects, your function should throw that error back to the generator.

If the cancel callback is called before the generator is done, your function should throw an error back to the generator. That error should be the string "Cancelled" (Not an Error object). If the error was caught, the returned promise should resolve with the next value that was yielded or returned. Otherwise, the promise should reject with the thrown error. No more code should be executed.

When the generator is done, the promise your function returned should resolve the value the generator returned. If, however, the generator throws an error, the returned promise should reject with the error.

An example of how your code would be used:

function* tasks() {
  const val = yield new Promise(resolve => resolve(2 + 2));
  yield new Promise(resolve => setTimeout(resolve, 100));
  return val + 1; // calculation shouldn't be done.
}
const [cancel, promise] = cancellable(tasks());
setTimeout(cancel, 50);
promise.catch(console.log); // logs "Cancelled" at t=50ms
If instead cancel() was not called or was called after t=100ms, the promise would have resolved 5.
 */

function cancellable<T>(
    generator: Generator<Promise<any>, T, unknown>
): [() => void, Promise<T>] {
    /**
     * 1. generator yields only promise
     * 2. function should pass the result of promise back to generator
     * 3. if promise rejected , function should should throw back to generator
     * 4. if cancel function is called, fnc should throw `Cancelled` back to generator
     * 5. if error was caught returned promise should resolve and stop execution
     * 6. when generator is done , returned promise should resolve with generator return
     */
    let cancelFn!: () => void;
    const cancelPromise = new Promise((res, rej) => {
        cancelFn = () => rej('Cancelled');
    });

    const execute = async (): Promise<T> => {
        let next = generator.next();
        while (!next.done) {
            try {
                const result = await Promise.race([cancelPromise, next.value]);
                next = generator.next(result);
            } catch (e) {
                /** here exception can occur under 2 scenarios
                 * 1. cancel function getting called to cancel
                 * 2. generator itself yields error.
                 * As requested we throw both back to generator and
                 * we need to resolve the next value or reject.
                 *
                 * by throwing into generator we are letting the generator
                 * function to decide if it needs to return a next value
                 * or throw.
                 *
                 * so next here will have the next value if generator decides
                 * to return else generator.throw(e) will throw an exception.
                 * and since execute function is inside a async/await it will
                 * automatically reject the main promise.
                 */
                next = generator.throw(e);
            }
        }
        return next.value;
    };

    const promise = execute();
    return [cancelFn, promise];
}

function* tasks(): Generator<Promise<number>, number, number> {
    let result = 0;
    try {
        yield new Promise((res) => setTimeout(res, 100));
        result += yield new Promise((res) => res(1));
        yield new Promise((res) => setTimeout(res, 100));
        result += yield new Promise((res) => res(1));
    } catch (e) {
        console.log('exception', e, result);
        return result;
    }
    return result;
}
const [cancel, promise] = cancellable(tasks());
setTimeout(cancel, 150);
promise
    .then((v) => console.log('resolve:', v))
    .catch((e) => console.log('reject:', e));
