/**
 * Given the root of a binary tree, return the maximum width of the given tree.

The maximum width of a tree is the maximum width among all levels.

The width of one level is defined as the length between the end-nodes (the leftmost and rightmost non-null nodes), where the null nodes between the end-nodes that would be present in a complete binary tree extending down to that level are also counted into the length calculation.

It is guaranteed that the answer will in the range of a 32-bit signed integer.
 */

import { createTree, TreeNode } from '../../../../models/leet-code.models';

function widthOfBinaryTree(root: TreeNode | null): number {
    /**
     * To keep track of level BFS is suitable
     * and maintain a levels array node per level
     * as we navigate we keep track of the baseIdx of the node & its level.
     * root's base index is 0 & its level is 0
     *   this baseIndex will tell us the pos (column) of the node in level's array
     *   baseIndex of left child is 2 * baseIdx of parent
     *   baseIndex of right child is 2 * baseIdx of parent  + 1
     *   level of anyChild is level of parent+1
     *
     * every node we place the node's value as [level][baseIdx] in the levels matrix
     *
     * finally we need to interate thought the levels
     *   1. trim all leading empty space
     *   2. map length of level
     * Max of all level lengths
     *
     */

    if (!root) return 0;

    const levels: number[][] = [];
    const queue: {
        node: TreeNode;
        baseIdx: number;
        level: number;
    }[] = [{ node: root, baseIdx: 0, level: 0 }];

    while (queue.length) {
        const cur = queue.shift() as {
            node: TreeNode;
            baseIdx: number;
            level: number;
        };
        levels[cur.level] = levels[cur.level] || [];
        levels[cur.level][cur.baseIdx] = cur.node.val;
        if (cur.node.left) {
            const pos = 2 * cur.baseIdx;
            queue.push({
                node: cur.node.left,
                baseIdx: pos,
                level: cur.level + 1,
            });
        }

        if (cur.node.right) {
            const pos = 2 * cur.baseIdx + 1;
            queue.push({
                node: cur.node.right,
                baseIdx: pos,
                level: cur.level + 1,
            });
        }
    }

    const levelLengths = levels.map((level) => {
        while (level[0] === undefined) {
            level.shift();
        }
        return level.length;
    });
    return Math.max(...levelLengths);
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
