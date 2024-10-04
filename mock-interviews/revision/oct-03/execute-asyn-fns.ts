/**
 * Implement a function in JavaScript that takes a list of async functions as input and a callback function and executes the async tasks in parallel that is all at once and invokes the callback after every task is executed.
 */

function asyncParallel(
    tasks: Array<(cb: (res: number) => void) => void>,
    callback: (res: number[]) => void
) {
    const results: number[] = [];
    let resultsReceived = 0;
    const taskCallback = (taskId: number, res: number) => {
        resultsReceived++;
        results[taskId] = res;

        if (resultsReceived === tasks.length) {
            callback(results);
        }
    };

    tasks.forEach((task, taskId) => task(taskCallback.bind(null, taskId)));
}

function createAsyncTask() {
    const value = Math.floor(Math.random() * 10);
    return function (callback: (res: number) => void) {
        setTimeout(() => {
            console.log('in create Async fn', value);
            callback(value);
        }, value * 1000);
    };
}

const taskList = [
    createAsyncTask(),
    createAsyncTask(),
    createAsyncTask(),
    createAsyncTask(),
    createAsyncTask(),
    createAsyncTask(),
];

asyncParallel(taskList, (result) => {
    console.log('results', result);
});
