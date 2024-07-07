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

declare global {
    interface Array<T> {
        multiply(position: number): T;
    }
}

const tuple = (input: string): number[][] => {
    if (!input || !input.trim().length) {
        return [];
    }

    const groups = input.match(/\([0-9,]+\)/g);
    if (!groups?.length) {
        return [];
    }

    const items = groups
        .map((row) => /(?<row>[0-9,]+)/.exec(row)?.groups?.row)
        .map((row) => {
            return row
                ? row.split(',').map((i) => parseInt(i, 10))
                : ([] as number[]);
        });

    return items;
};

Array.prototype.multiply = function (position: number): number {
    if (!this) {
        return 0;
    }

    const actualPosInArray = position - 1;
    const itemsToMultiply = this.map((row) => {
        return Array.isArray(row) && typeof row[actualPosInArray] === 'number'
            ? row[actualPosInArray]
            : 1;
    }).flat();
    return itemsToMultiply.reduce((acc, cur) => acc * cur, 1);
};

console.log(
    '(1,2,3),(4,5,6),(7,8,9)',
    tuple('(1,2,3),(4,5,6),(7,8,9)'),
    'multiply::',
    tuple('(1,2,3),(4,5,6),(7,8,9)').multiply(2)
);

console.log(
    '(1,2,3),(4,5,6),(7,8)',
    tuple('(1,2,3),(4,5,6),(7,8)'),
    'multiply::',
    tuple('(1,2,3),(4,5,6),(7,8)').multiply(3)
);

console.log(
    '(1,2,3),(),(7,8)',
    tuple('(1,2,3),(),(7,8,9)'),
    'multiply::',
    tuple('(1,2,3),(),(7,8,9)').multiply(3)
);

console.log(
    '(1,2,3),(a),(7,8)',
    tuple('(1,2,3),(a),(7,8,9)'),
    'multiply::',
    tuple('(1,2,3),(a),(7,8,9)').multiply(1)
);
