/**
 * Given the root of a binary tree, return the maximum width of the given tree.

The maximum width of a tree is the maximum width among all levels.

The width of one level is defined as the length between the end-nodes (the leftmost and rightmost non-null nodes), where the null nodes between the end-nodes that would be present in a complete binary tree extending down to that level are also counted into the length calculation.

It is guaranteed that the answer will in the range of a 32-bit signed integer.
 */

import { createTree, TreeNode } from '../../../../../models/leet-code.models';

function widthOfBinaryTree(root: TreeNode | null): number {
    /**
     *       1
     *   3      2
     * 5   3      9
     *
     *
     * perform level order traversal of the tree.
     *   every node keep track of baseIdx of the node , starting with root at 0 idx.
     *   baseIdx lets you calculate the position of the child in the level (if the level is
     *   considers as an array)
     *
     * we need to process every node at a level l in one go so we can calculate the width of the level.
     *  at a given level width = idx of last child - idx of first child + 1
     */

    if (!root) return 0;
    let maxWidth = 0;

    const queue: [[TreeNode, number]] = [[root, 0]];

    while (queue.length) {
        // We will process all nodes in a level in one go.
        const noOfChildren = queue.length;

        const [, firstIdx] = queue[0];
        const [, lastIdx] = queue[queue.length - 1];
        maxWidth = Math.max(maxWidth, lastIdx - firstIdx + 1);
        for (let i = 0; i < noOfChildren; i++) {
            const [node, idx] = queue.shift()!;
            if (node.left) {
                queue.push([node.left, 2 * (idx - firstIdx)]);
            }

            if (node.right) {
                queue.push([node.right, 2 * (idx - firstIdx) + 1]);
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
