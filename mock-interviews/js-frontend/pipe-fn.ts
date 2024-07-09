/***
 * In this question, the candidate needs to implement a utility called pipe that takes n
 * functions as input and returns a function that can be invoked to compute the final
 * result by invoking each input function and providing the previous functions' output as
 * an argument.
 *
 * Example:
 * const getName = (object) => object.name;
 * const makeUpperCase = (string) => string.toUpperCase();
 * const slice = (string) => string.slice(0, 3);
 * const method = pipe(getName, makeUpperCase, slice);
 * const value = method({ name: 'devtools' });
 * console.log(value); // DEV
 */

type fnc = (arg: unknown) => unknown;

const pipe = (...functions: fnc[]): fnc => {
    return (arg: unknown) => {
        return functions.reduce((acc, fn) => {
            return fn(acc);
        }, arg);
    };
};

const getName = (object: { name: string }) => object.name;
const makeUpperCase = (string: string) => string.toUpperCase();
const slice = (string: string) => string.slice(0, 3);

const method = pipe(getName as fnc, makeUpperCase as fnc, slice as fnc);

const value = method({ name: 'devtools' });

console.log(value);
// DEV
