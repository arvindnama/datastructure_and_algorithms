/**
 * Implement a function in JavaScript that takes a list of async functions as input and a callback function and executes the async tasks in parallel that is all at once and invokes the callback after every task is executed.
 */

function asyncParallel(
    tasks: Array<(cb: (res: number) => void) => void>,
    callback: (res: number[]) => void
) {
    let tasksCompleted = 0;
    const result: number[] = [];

    const onTaskComplete = (id: number, res: number) => {
        console.log('completed task ', id, 'result ', res);
        result[id] = res;
        tasksCompleted++;
        if (tasksCompleted === taskList.length) {
            callback(result);
        }
    };
    tasks.forEach((task, idx) => {
        console.log('initiated task ', idx);
        task(onTaskComplete.bind(null, idx));
    });
}

function createAsyncTask() {
    const value = Math.floor(Math.random() * 10);
    return function (callback: (res: number) => void) {
        setTimeout(() => {
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
