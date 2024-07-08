/**
 * In this question, the candidate needs to implement a function that takes a string and
 * final value as inputs. It returns a new object created based on it.
 *
 * Syntax:
 *      stringToObject(input, finalValue);
 *
 * Arguments:
 *      input (String): The object path from which we need to create an object.
 *      finalValue (any): The final leaf node value.
 *
 * Examples:
 *  stringToObject('a.b.c', 1); // { a: { b: { c: 1 } } }
 *
 *
 * stringToObject('', 1);// throw a TypeError
 *
 * stringToObject('a."b.c"."d.e"', 2); // consider "b.c" and "d.e" as individual keys
 * // output => { a: { 'b.c': { 'd.e': 2 } } }
 *
 * stringToObject('users.0.name', 'devtools tech')
 * // users would be an array that contains one single object with name property with final value
 * // { users: [{ name: 'devtools tech' }] }
 *
 */

function stringToObject(
    input: string,
    finalValue: unknown
): Record<string, unknown> {
    const customSeparator = '<custom_separator_>';
    if (!input) throw new Error('Type error');

    const keyWithDotRegEx = new RegExp(
        '"(?<left>[a-z]+).(?<right>[a-z]+)"',
        'g'
    );
    let res: RegExpExecArray | null;
    let correctedInput = input.substring(0);
    while ((res = keyWithDotRegEx.exec(input)) !== null) {
        const keyWithDot = res[0];

        // lets replace keywithdot to something diff
        correctedInput = correctedInput.replace(
            keyWithDot,
            `${res.groups?.['left']}${customSeparator}${res.groups?.['right']}`
        );
    }

    // we can safely split on .
    const keys = correctedInput
        .split('.')
        .filter((a) => a?.length) // filter out empty string in split arr
        .map((a) => a.replace(/^\./, '').replace(/\.$/, '')); // replace . with ''

    return keys.reverse().reduce((acc, cur) => {
        let res: Array<unknown> | Record<string, unknown>;
        if (cur.match(/^\d+$/)) {
            // is digit
            res = [] as Array<unknown>;
            res[parseInt(cur)] = acc;
        } else {
            cur = cur.replace(customSeparator, '.');
            res = {};
            res[cur] = acc;
        }
        return res;
    }, finalValue) as Record<string, unknown>;
}

console.log('String to Object test');

console.log(`stringToObject('a.b.c', 1)`, '::', stringToObject('a.b.c', 1));
console.log(
    `stringToObject('a."b.c"."d.e"', 2)`,
    '::',
    stringToObject('a."b.c"."d.e"', 2)
);

console.log(
    `stringToObject('users.0.name', 'devtools tech')`,
    '::',
    stringToObject('users.0.name', 'devtools tech')
);
