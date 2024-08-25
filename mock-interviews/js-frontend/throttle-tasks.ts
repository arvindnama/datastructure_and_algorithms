/**
 * Implement a throttler that executes an array of tasks. When the throttler is passed a number, only executes that number of the tasks and passes the other tasks into a queue.
 */

const throttle = <T>(
    tasks: T[],
    count = tasks.length,
    callback: (task: T[]) => void,
    delay = 1000
) => {
    let queue = [...tasks];
    let lastRun!: number;
    let timer!: NodeJS.Timeout;
    const runNextSetOfTasks = () => {
        console.log('In throttle: executing task');
        queue = [...queue, ...tasks]; // to ensure we dont end up on zero tasks
        const curTasks = queue.splice(0, count);
        callback(curTasks);
        lastRun = Date.now();
    };
    return () => {
        if (!lastRun) {
            // first run...
            runNextSetOfTasks();
        } else {
            clearTimeout(timer);
            let nextRunDelay = delay - (Date.now() - lastRun);
            nextRunDelay = nextRunDelay < 0 ? 0 : nextRunDelay;

            timer = setTimeout(() => {
                runNextSetOfTasks();
            }, nextRunDelay);
        }
    };
};

const tf = throttle(
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    2,
    (task) => {
        console.log(task);
    },
    2000
);

setTimeout(() => {
    console.log('calling: tf');
    tf();
});
setTimeout(() => {
    console.log('calling: tf');
    tf();
}, 1900);
setTimeout(() => {
    console.log('calling: tf');
    tf();
}, 4000);
