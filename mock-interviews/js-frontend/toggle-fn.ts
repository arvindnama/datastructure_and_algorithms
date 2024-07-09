/**
 * In this question, you need create a function toggle that accepts an array as input and toggles between the values in a cyclic manner.
 *
 *
 * - Input value should be an array with length >= 1.
 * - If input parameter type is not an array then throw a TypeError.
 * - If input array length <= 0 then throw an error.
 * - The toggle function should cycle between the values in clockwise direction.
 * Example:
 *
 * const animals = ['dog', 'cat', 'elephant', 'tiger', 'lion'];
 * const toggled = toggle(animals);
 *
 * toggled(); // returns dog
 * toggled(); // returns cat
 * toggled(); // returns elephant
 * toggled(); // returns tiger
 * toggled(); // returns lion
 * toggled(); // returns dog
 */

const toggle = (list: unknown): (() => unknown) => {
    if (!Array.isArray(list)) throw Error('invalid arguments');
    if (list.length <= 0) throw Error('invalid arguments');

    let curIdx = 0;
    return () => list[curIdx++ % list.length];
};

const animals = ['dog', 'cat', 'elephant', 'tiger', 'lion'];
const toggled = toggle(animals);

console.log(toggled()); // returns dog
console.log(toggled()); // returns cat
console.log(toggled()); // returns elephant
console.log(toggled()); // returns tiger
console.log(toggled()); // returns lion
console.log(toggled()); // returns dog
console.log(toggled()); // returns cat
