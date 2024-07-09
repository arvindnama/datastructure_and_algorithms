/**
 * In this question, you must implement a function called sortBy that returns a new sorted
 * array in ascending order by a given property.
 * This question is similar to sortBy method provided by the Lodash library.
 */

/**
 *
 * Example
 * const arrayOne = [{a: 1}, {a: 3}, {a: 2}];
 * // expected output: [{a: 1}, {a: 2}, {a: 3}];
 * sortBy(arrayOne, 'a');
 *
 * const arrayTwo = [{a: 1, b: 'z'}, {a: 2, b: 'y'}, {a: 1, b: 'x'}, {a: 2, b: 'w'}];
 * // expected output: [{a: 1, b: 'z'}, {a: 1, b: 'x'}, {a: 2, b: 'y'}, {a: 2, b: 'w'}];
 * sortBy(arrayTwo, 'a');
 *
 * const arrayThree = [{ a: 1, b: { c: 4 }}, { a: 2, b: { c: 2 }}, { a: 3, b: { c: 1}}, { a: 4, b: { c: 0}}];
 * // expected output: [{"a":4,"b":{"c":0}},{"a":3,"b":{"c":1}},{"a":2,"b":{"c":2}},{"a":1,"b":{"c":4}}]
 * sortBy(arrayThree, 'b.c');
 */

const sortBy = (
    collection: Array<unknown>,
    property: string,
    descending = false
): Array<unknown> => {
    if (!collection || collection.length < 1) return collection;

    const propVal = (a: any, props: string[]): any => {
        if (props.length === 0) return a;

        const prop = props.shift() as string;
        if (a.hasOwnProperty(prop)) {
            return propVal(a[prop], props);
        }
        return -1;
    };

    const compareStr = (a: string, b: string): number =>
        a > b ? 1 : a < b ? -1 : 0;

    return collection.sort((a, b) => {
        const aPropVal = propVal(a, property.split('.'));
        const bPropVal = propVal(b, property.split('.'));

        if (typeof aPropVal !== typeof bPropVal) {
            // cannot make a inform decision hence , leave as it is.
            return 0;
        }
        if (typeof aPropVal === 'number') {
            return descending ? bPropVal - aPropVal : aPropVal - bPropVal;
        }

        if (typeof aPropVal === 'string') {
            return descending
                ? compareStr(bPropVal, aPropVal)
                : compareStr(aPropVal, bPropVal);
        }

        return 0;
    });
};

const arrayOne = [{ a: 1 }, { a: 3 }, { a: 2 }];

// expected output: [{a: 1}, {a: 2}, {a: 3}];
console.log('Ascending', sortBy(arrayOne, 'a'));
console.log('descending', sortBy(arrayOne, 'a', true));

const arrayTwo = [
    { a: 1, b: 'z' },
    { a: 2, b: 'y' },
    { a: 1, b: 'x' },
    { a: 2, b: 'w' },
];

// expected output: [{a: 1, b: 'z'}, {a: 1, b: 'x'}, {a: 2, b: 'y'}, {a: 2, b: 'w'}];
console.log('Ascending', sortBy(arrayTwo, 'b'));
console.log('Descending', sortBy(arrayTwo, 'b', true));

const arrayThree = [
    { a: 1, b: { c: 4 } },
    { a: 2, b: { c: 2 } },
    { a: 3, b: { c: 1 } },
    { a: 4, b: { c: 0 } },
];

console.log('Ascending', sortBy(arrayThree, 'b.c'));
console.log('Descending', sortBy(arrayThree, 'b.c', true));
