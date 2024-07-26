/**
 * Write a function createCounter. It should accept an initial integer init. It should return an object with three functions.

The three functions are:

increment() increases the current value by 1 and then returns it.
decrement() reduces the current value by 1 and then returns it.
reset() sets the current value to init and then returns it.

 */

type Counter = {
    increment: () => number;
    decrement: () => number;
    reset: () => number;
};

function createCounter(init: number): Counter {
    let curValue = init;
    return {
        increment: () => ++curValue,
        decrement: () => --curValue,
        reset: () => {
            curValue = init;
            return curValue;
        },
    };
}

const c = createCounter(5);
console.log(c.increment());
console.log(c.decrement());
console.log(c.reset());
