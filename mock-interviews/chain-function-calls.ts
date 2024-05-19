/**
 * Write a magic function that chains n asynchronous tasks
 */

/* eslint-disable  @typescript-eslint/no-explicit-any */

type Task = (cb: any) => void;

const callbackToPromise = (task: Task): () => Promise<unknown> => () => new Promise(res => task(res));

const f1: Task  = (cb) => {
    setTimeout(() => {
        console.log('1');
        if(cb) cb();
    }, 1000);
};

const f2 = (cb: any) =>
    setTimeout(() => {
        console.log('2');
        if(cb)  cb();
    }, 500);

const f3 = (cb: any) =>
    setTimeout(() => {
        console.log('3');
        if(cb) cb();
    }, 500);

const magic = (...callers: Array<Task>) => {
    const lastTaskIdx = callers.length - 1;

    let chain = () => callers[lastTaskIdx - 1](callers[lastTaskIdx]);
    for (let i = lastTaskIdx - 2; i >= 0; i--) {
        const chainClone = chain.bind({})
        chain = () => callers[i](chainClone);
    }

    chain();
};

const magicPromise = async (...callers: Array<Task>) => {

    for (let i = 0; i < callers.length; i++) {
        await callbackToPromise(callers[i])();
    }
}
magicPromise(f1, f2, f3, f1, f3);
magic(f1, f2, f3, f1, f3);
