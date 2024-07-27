/**
 *
Given a multi-dimensional array arr and a depth n, return a flattened version of that array.

A multi-dimensional array is a recursive data structure that contains integers or other multi-dimensional arrays.

A flattened array is a version of that array with some or all of the sub-arrays removed and replaced with the actual elements in that sub-array. This flattening operation should only be done if the current depth of nesting is less than n. The depth of the elements in the first array are considered to be 0.

Please solve it without the built-in Array.flat method.
 */

type MultiDimensionalArray = (number | MultiDimensionalArray)[];

const flat = function (
    arr: MultiDimensionalArray,
    n: number
): MultiDimensionalArray {
    if (n === 0) return arr;

    const flatArr: MultiDimensionalArray = [];
    let isAllFlat = true;
    arr.forEach((e) => {
        if (Array.isArray(e)) {
            isAllFlat = false;
            e.forEach((i) => flatArr.push(i));
            return;
        }
        flatArr.push(e);
    });
    return isAllFlat ? flatArr : flat(flatArr, n - 1);
};

console.log(
    flat([1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]], 1)
);
console.log(
    flat(
        [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, [9, 10, 11], 12],
            [13, 14, 15],
        ],
        2
    )
);
