/**
 * Implement a mapLimit function that is similar to the Array.map() which returns a promise that resolves on the list of output by mapping each input through an asynchronous iteratee function or rejects it if any error occurs. It also accepts a limit to decide how many operations can occur at a time.

The asynchronous iteratee function will accept a input and a callback. The callback function will be called when the input is finished processing, the first argument of the callback will be the error flag and the second will be the result.
 */

function mapLimit<T>(
    arr: Array<T>,
    limit: number,
    executeFn: (e: T, cb: (error: boolean, result?: unknown) => void) => void
): Promise<unknown[]> {
    return new Promise((resolve, reject) => {
        const taskResults: unknown[] = [];
        let curTaskId = 0;
        let inErrorState = false;

        const taskCallBack = (
            taskId: number,
            error: boolean,
            result?: unknown
        ) => {
            if (inErrorState) return; // if already in error state ignore all callbacks
            if (error) {
                inErrorState = true;
                reject(error);
                // and stop processing
                return;
            }

            taskResults[taskId] = result;

            // we will need to invoke any queues tasks or else
            // when all tasks are processed we need to resolve

            if (curTaskId < arr.length) {
                // we have few pending items to schedule
                executeFn(arr[curTaskId], taskCallBack.bind(null, curTaskId));
                curTaskId++;
                return;
            }
            resolve(taskResults);
            return;
        };

        for (; curTaskId < limit; curTaskId++) {
            executeFn(arr[curTaskId], taskCallBack.bind(null, curTaskId));
        }
    });
}

const numPromise = mapLimit([1, 2, 3, 4, 5], 3, function (num, callback) {
    setTimeout(function () {
        num = num * 2;
        // console.log('IN eval fun', num);

        // throw error
        if (num === 6) {
            callback(true);
        } else {
            callback(false, num);
        }
    }, 2000);
});

numPromise
    .then((result) => console.log('success:' + result))
    .catch(() => console.log('no success'));
