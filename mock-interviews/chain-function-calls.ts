/**
 * Write a magic function that chains n asynchronous tasks
 */


type Task = (cb?: Task) => void;

const callbackToPromise = (task: Task): () => Promise<unknown> => () => new Promise(res => task(res));

const f1 = (cb?: Task) => {
    setTimeout(() => {
        console.log('1');
        if(cb) cb();
    }, 1000);
};

const f2 = (cb?: Task) =>
    setTimeout(() => {
        console.log('2');
        if(cb)  cb();
    }, 500);

const f3 = (cb?: Task) =>
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


const magicWithoutBind = (...callers: Array<Task>) => {
    let callStack = () => {};
    const iterateCallStack = (idx: number) => {
        callStack = ((idx: number, cb)=> ()=> {
            callers[idx](cb as Task);
        })(idx, callStack);
    }

    for(let i = callers.length - 1; i > -1; i--){
        iterateCallStack(i);
    }

    callStack();
}

setTimeout(()=> {
    console.log('Magic with callback clones');
    magic(f1, f2, f3, f1, f3);
})

setTimeout(()=> {
    console.log('Magic with promise');
    magicPromise(f1, f2, f3, f1, f3);
},3510);

setTimeout(()=> {
    console.log('Magic with callback - no cloning of functions')
    magicWithoutBind(f1, f2, f3, f1, f3);
}, 7020);
