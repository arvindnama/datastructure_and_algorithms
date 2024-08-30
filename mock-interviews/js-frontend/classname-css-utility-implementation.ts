/**
 * In our JSX, we set the className prop to add CSS classes to an element. It can be as simple as the following
 * To help out in such cases, classnames package is a simple JavaScript utility for conditionally joining classNames together. For example --
 *
 *
 *
 *
 * classNames('foo', 'bar'); // => 'foo bar'
classNames('foo', { bar: true }); // => 'foo bar'
classNames({ 'foo-bar': true }); // => 'foo-bar'
classNames({ 'foo-bar': false }); // => ''
classNames({ foo: true }, { bar: true }); // => 'foo bar'
classNames({ foo: true, bar: true }); // => 'foo bar'

// lots of arguments of various types
classNames('foo', { bar: true, duck: false }, 'baz', { quux: true }); // => 'foo bar baz quux'

// other falsy values are just ignored
classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''); // => 'bar 1'

// Arrays are recursively flattened
var arr = ['b', { c: true, d: false }];
classNames('a', arr); // => 'a b c'

In this question, you need to implement the function classNames from scratch. Your function should be able to take different types of inputs and return a valid string of classes.
 */

type ClassNamesArgs =
    | undefined
    | null
    | boolean
    | number
    | string
    | Record<string, undefined | null | boolean>
    | Array<ClassNamesArgs>;

function classNames(...args: ClassNamesArgs[]): string {
    const isPrimitive = (a: unknown): boolean =>
        ['string', 'number', 'boolean', 'undefined'].includes(typeof a) ||
        a == null;

    return args
        .map((arg) => {
            if (Array.isArray(arg)) {
                return classNames(...arg);
            }

            if (isPrimitive(arg)) {
                return !arg ? '' : arg;
            }

            const record = arg as Record<string, boolean>;
            return Object.keys(record)
                .filter((key) => !!record[key])
                .map((key) => key)
                .join(' ');
        })
        .filter((res) => !!res)
        .join(' ');
}

console.log(classNames('foo', 'bar'));
console.log(classNames('foo', { bar: true }));
console.log(classNames({ 'foo-bar': true }));
console.log(classNames({ 'foo-bar': false }));
console.log(classNames({ foo: true }, { bar: true }));
console.log(classNames({ foo: true, bar: true }));
console.log(
    classNames('foo', { bar: true, duck: false }, 'baz', { quux: true })
);
console.log(classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''));
console.log(classNames('a', ['b', { c: true, d: false }]));
