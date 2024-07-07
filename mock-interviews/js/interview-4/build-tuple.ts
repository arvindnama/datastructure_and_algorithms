/**
 * Implement a tuple function that takes a string as input
 * and converts it into array or arrays. The Tuple should support a function mulitple
 * that multiplies ith Item of each nested array.
 *
 * Syntax:
 *
 * const items = tuple(input);
 * item.multiply(position);
 *
 * const input  = "(1,2,3),(4,5,6),(7,8,9)"
 * // Convert it into
 * // [[1,2,3],[4,5,6],[7,8,9]]
 *
 * multiplies 2nd item in each nested array
 * i.e. 2*5*8 = 80
 * console.log(item.multiply(2))
 */

const tuple = (input: string): number[][] => {
    if (!input || !input.trim().length) {
        return [];
    }

    // split based on syntax approach

    // const rowsStrings = input
    //     .split('),')
    //     .map((a) => a.replace('(', '').replace(')', ''));

    // const items = rowsStrings.map((rowString) =>
    //     rowString.split(',').map((i) => parseInt(i, 10))
    // );

    // regex approach
    const groups = input.match(/\([^\)]+\)/g);

    if (!groups?.length) {
        return [];
    }

    const items = groups
        .map((g) => g.replace('(', '').replace(')', ''))
        .map((g) => g.split(',').map((i) => parseInt(i, 10)));

    (items as any).multiply = (position: number): number => {
        const itemsToMultiply = items.map((row) => row[position - 1]).flat();
        return itemsToMultiply.reduce((acc, cur) => acc * cur, 1);
    };

    return items;
};

const input = '(1,2,3),(4,5,6),(7,8,9)';
const items = tuple(input);
console.log((items as any).multiply(2));
