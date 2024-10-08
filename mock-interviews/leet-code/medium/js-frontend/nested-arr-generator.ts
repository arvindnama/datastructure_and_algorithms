/**
 * Given a multi-dimensional array of integers, return a generator object which yields integers in the same order as inorder traversal.

A multi-dimensional array is a recursive data structure that contains both integers and other multi-dimensional arrays.

inorder traversal iterates over each array from left to right, yielding any integers it encounters or applying inorder traversal to any arrays it encounters.
 */

type MultidimensionalArray = (MultidimensionalArray | number)[];

function* inorderTraversal(
    arr: MultidimensionalArray
): Generator<number, void, unknown> {
    if (!Array.isArray(arr)) {
        yield arr as number;
        return;
    }
    for (let i = 0; i < arr.length; i++) {
        yield* inorderTraversal(arr[i] as MultidimensionalArray);
    }
}

const gen = inorderTraversal([1, [[2], [3]]]);
gen.return;
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3
