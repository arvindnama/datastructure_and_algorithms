/***

Sometimes you have a long running task, and you may wish to cancel it before it completes. To help with this goal, write a function cancellable that accepts a generator object and returns an array of two values: a cancel function and a promise.

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
    generator: Generator<Promise<unknown>, T, unknown>
): [() => void, Promise<T>] {
    let cancelFn!: () => void;

    const cancelPromise = new Promise((res, rej) => {
        cancelFn = () => rej('Cancelled');
    });

    const promise = (async () => {
        let next = generator.next();
        while (!next.done) {
            try {
                next = generator.next(
                    await Promise.race([cancelPromise, next.value])
                );
            } catch (e) {
                // generator or cancelPromise can throw an error.
                // send back to generator and end the generator
                // if cancel Promise throws an error generator.thow will take the exception
                // if generator throws an error , sending back to generator will be no-op as it is already done
                next = generator.throw(e);
            }
        }
        return next.value;
    })();
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
        return result;
    }
    return result;
}
const [cancel, promise] = cancellable(tasks());
setTimeout(cancel, 150);
promise
    .then((v) => console.log('resolve:', v))
    .catch((e) => console.log('reject:', e));
