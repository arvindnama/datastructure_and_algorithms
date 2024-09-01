/**
 * Implement a function that takes a list of async functions as input and executes them in a series that is one at a time. The next task is executed only when the previous task is completed
 * Output of one should pass as input to other
 */

const executeTaskInSeries = (
    tasks: Array<(arg: unknown) => Promise<unknown>>
): ((args: unknown) => Promise<unknown>) => {
    const execute = async (
        arg: unknown,
        resolve: (value: unknown) => void,
        reject: (reason?: any) => void
    ) => {
        let input = arg;
        try {
            for (const task of tasks) {
                const result = await task(input);
                input = result; // result of task 1 becomes input of next task
            }
            resolve(input);
        } catch (e) {
            console.error('task executing failed ... breaking the chain');
            reject(e);
        }
    };
    return (arg: unknown) => {
        return new Promise((resolve, reject) => {
            execute(arg, resolve, reject);
        });
    };
};

const asyncTask = function (i: any) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            i < 5 ? resolve(i + 1) : reject(`rejecting ${i}`);
        }, 100 * i);
    });
};

const test1 = async () => {
    const tasks = [asyncTask, asyncTask, asyncTask, asyncTask];
    const executorFn = executeTaskInSeries(tasks);
    console.log('Running Test 1, should expect a pass');
    await executorFn(1).then(console.log).catch(console.error);
};

const test2 = async () => {
    const tasks = [
        asyncTask,
        asyncTask,
        asyncTask,
        asyncTask,
        asyncTask,
        asyncTask,
    ];
    const executorFn = executeTaskInSeries(tasks);
    console.log('Running Test 2, should expect a fail');
    await executorFn(1).then(console.log).catch(console.error);
};

(async () => {
    await test1();
    await test2();
})();
