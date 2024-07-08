/**
 * In this question, the candidate needs to implement a function that returns the count of
 * numbers in a provided array.
 * The array might contain other data types and nested arrays too.
 *
 * Syntax:
 *  countNumbers(collection);
 *
 * Arguments:
 *  collection (Array): The input array.
 *
 * Return:
 * the total count of numbers inside the array.
 *
 * Example:
 * countNumbers([ 1,"2", [3,4,[5]], function(){}, 8, 9 ]);
 * // 6
 * countNumbers([])
 * // 0
 */

const countNumbers = (collection: Array<unknown>): number => {
    if (collection?.length == 0) return 0;

    const nextEl = collection.shift();
    if (typeof nextEl === 'number') {
        return 1 + countNumbers(collection); // 1 + remaining collection count
    } else if (Array.isArray(nextEl)) {
        return countNumbers(nextEl) + countNumbers(collection); // count curr Arr + remaining
    } else if (typeof nextEl === 'object') {
        const objValues = Object.values(nextEl as Record<string, unknown>);
        return countNumbers(objValues) + countNumbers(collection);
    }
    return countNumbers(collection); // ignore current and count remaining
};

// tests

console.assert(
    countNumbers([1, '2', [3, 4, [5]], function () {}, 8, 9]) === 6,
    "[1, '2', [3, 4, [5]], function () {}, 8, 9] : has only 6 numbers"
);

console.assert(countNumbers([]) === 0, '[] : has 0 numbers');

console.assert(
    countNumbers([1, '2', [3, 4, [5, [6, [7]]]], function () {}, 8, 9]) === 8,
    "[1, '2', [3, 4, [5, [6, [7]]]], function () {}, 8, 9]] : has only 8 numbers"
);

console.assert(
    countNumbers([
        1,
        '2',
        { a: [3, 4, [5, [6, [7]]]] },
        function () {},
        8,
        9,
    ]) === 8,
    "[1, '2', {a: [3, 4, [5, [6, [7]]]]}, function () {}, 8, 9] : has only 8 numbers"
);

console.log('all tests passed');
