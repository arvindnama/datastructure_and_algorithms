/**
 * Write a function that satisfies the following.

add(1)(2).value() = 3;
add(1, 2)(3).value() = 6;
add(1)(2)(3).value() = 6;
add(1)(2) + 3 = 6;
 */

const add = (...args: number[]): any => {
    let store = args;

    const addCurryFn = (...args: number[]): any => {
        store = [...store, ...args];
        return addCurryFn;
    };

    addCurryFn.valueOf = () => store.reduce((a, b) => a + b, 0);
    addCurryFn.value = addCurryFn.valueOf;

    return addCurryFn;
};

console.log(add(1)(2)(3) + 1);
console.log(add(1)(2)(3)(1, 2).valueOf() === 9);
