/**
 * mplement a mapLimit function that is similar to the Array.map() which returns a promise that resolves on the list of output by mapping each input through an asynchronous iteratee function or rejects it if any error occurs. It also accepts a limit to decide how many operations can occur at a time.

The asynchronous iteratee function will accept a input and a callback. The callback function will be called when the input is finished processing, the first argument of the callback will be the error flag and the second will be the result.
 */

function mapLimit<T>(
    arr: Array<T>,
    limit: number,
    callBack: (e: T, cb: (error: boolean, result?: unknown) => void) => void
): Promise<unknown[]> {
    return new Promise<unknown[]>((resolve, reject) => {
        let taskId = 0;
        let taskCompleted = 0;
        const results: Array<unknown> = [];
        const invokeTask = (id: number) =>
            callBack(arr[id], taskCallback.bind(null, id));
        const taskCallback = (id: number, error: boolean, result: unknown) => {
            if (error) {
                reject();
                return;
            }
            taskCompleted++;
            results[id] = result;
            if (taskCompleted === arr.length) {
                // done with all tasks
                resolve(results);
                return;
            }
            if (taskId < arr.length) {
                // schedule next task
                invokeTask(taskId);
                taskId++;
            }
        };

        while (taskId < limit) {
            callBack(arr[taskId], taskCallback.bind(null, taskId));
            taskId++;
        }
    });
}

// const numPromise = mapLimit([1, 2, 3, 4, 5], 3, function (num, callback) {
//     setTimeout(function () {
//         num = num * 2;
//         console.log(num);
//         callback(false, num);
//     }, 2000);
// });

// numPromise
//     .then((result) => console.log('success:' + result))
//     .catch(() => console.log('no success'));

const numPromise = mapLimit([1, 2, 3, 4, 5], 3, function (num, callback) {
    setTimeout(function () {
        num = num * 2;
        console.log(num);

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
