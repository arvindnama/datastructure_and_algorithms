/**
 * Given the root of a binary tree, return the maximum width of the given tree.

The maximum width of a tree is the maximum width among all levels.

The width of one level is defined as the length between the end-nodes (the leftmost and rightmost non-null nodes), where the null nodes between the end-nodes that would be present in a complete binary tree extending down to that level are also counted into the length calculation.

It is guaranteed that the answer will in the range of a 32-bit signed integer.
 */

import { createTree, TreeNode } from '../../../../../models/leet-code.models';

function widthOfBinaryTree(root: TreeNode | null): number {
    /**
     * we need to traverse every level
     * for every level , we will need to figure out the position of the node in the level.
     * position of the node is based on the position of its parent
     * position of left child of node = 2 * position of parent
     * position of right child of node = 2 * position of parent + 1
     *
     * level = 0 ---> root baseIndex = 0
     * level = 1 ---> root.left      = 2 * 0  = 0
     * level = 1 ---> root.right     = 2 * 0 + 1 = 1
     *
     * level = 2 ---> root.left.left     = 2 * 0  = 0
     * level = 2 ---> root.left.right    = 2 * 0 + 1= 1
     * level = 2 ---> root.right.left    = 2 * 1  = 2
     * level = 2 ---> root.right.right    = 2 * 1 + 1  = 3
     *
     * and so on ..
     *
     * we will need to for each level find the startIdx of node at level and endIdx
     * width of the tree at this level = endIdx - startIdx +1 .
     * update the global max for each level.
     *
     */
    if (!root) return 0;

    const queue: [TreeNode, number][] = [[root, 0]];

    let maxWidth = 1;
    while (queue.length) {
        // this is a special case where we read all node at same level in one go
        // and compute the wide at the level and add the child node once the compuation is done.

        const [, baseIdx] = queue[0];
        const noOfNodesAtLevel = queue.length;

        const leftMostNodeInLevel = queue[0];
        const rightMostNodeInLevel = queue[noOfNodesAtLevel - 1];
        const width = rightMostNodeInLevel[1] - leftMostNodeInLevel[1] + 1;
        maxWidth = Math.max(width, maxWidth);

        for (let i = 0; i < noOfNodesAtLevel; i++) {
            const [node, idx] = queue.shift()!;
            if (node.left) {
                // add its left child to queue.
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
