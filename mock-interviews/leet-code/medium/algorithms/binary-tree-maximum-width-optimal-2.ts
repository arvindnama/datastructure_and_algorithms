/**
 * Given the root of a binary tree, return the maximum width of the given tree.

The maximum width of a tree is the maximum width among all levels.

The width of one level is defined as the length between the end-nodes (the leftmost and rightmost non-null nodes), where the null nodes between the end-nodes that would be present in a complete binary tree extending down to that level are also counted into the length calculation.

It is guaranteed that the answer will in the range of a 32-bit signed integer.
 */

import { createTree, TreeNode } from '../../../../models/leet-code.models';

function widthOfBinaryTree(root: TreeNode | null): number {
    if (!root) return 0;

    let maxWidth = 1;

    const queue: [TreeNode, number][] = [[root, 0]];

    while (queue.length) {
        const size = queue.length;
        const baseIdx = queue[0][1];

        const [, l] = queue[0];
        const [, r] = queue[size - 1];
        maxWidth = Math.max(maxWidth, r - l + 1);

        // remove all nodes at level and add next level
        for (let i = 0; i < size; i++) {
            const [node, idx] = queue.shift()!;
            if (node.left) {
                queue.push([node.left, 2 * (idx - baseIdx)]);
            }
            if (node.right) {
                queue.push([node.right, 2 * (idx - baseIdx) + 1]);
            }
        }
    }

    return maxWidth;
}

let root = createTree([
    1,
    3,
    2,
    5,
    null,
    null,
    9,
    6,
    null,
    null,
    null,
    null,
    null,
    7,
]);

console.log(widthOfBinaryTree(root));

root = createTree([
    1,
    3,
    2,
    5,
    null,
    null,
    9,
    null,
    null,
    null,
    null,
    null,
    null,
    7,
]);

console.log(widthOfBinaryTree(root));

root = createTree([1, 3, 2, 5]);

console.log(widthOfBinaryTree(root));

root = createTree([1, 3, 2, 5, 3, null, 9]);
console.log(widthOfBinaryTree(root));

root = createTree([1]);
console.log(widthOfBinaryTree(root));
