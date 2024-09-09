/**
 * Given the root of a binary tree, return the maximum width of the given tree.

The maximum width of a tree is the maximum width among all levels.

The width of one level is defined as the length between the end-nodes (the leftmost and rightmost non-null nodes), where the null nodes between the end-nodes that would be present in a complete binary tree extending down to that level are also counted into the length calculation.

It is guaranteed that the answer will in the range of a 32-bit signed integer.
 */

import { createTree, TreeNode } from '../../../../models/leet-code.models';

function widthOfBinaryTree(root: TreeNode | null): number {
    type QueueItem = { node: TreeNode; level: number; baseIdx: number };
    type Level = { startIdx: number; length: number };

    if (!root) return 0;

    let maxWidth = 1;

    const levels: Level[] = [{ startIdx: 0, length: 1 }];
    const queue: QueueItem[] = [{ node: root, level: 0, baseIdx: 0 }];

    while (queue.length) {
        const cur = queue.shift()!;
        if (cur.node.left) {
            const node = cur.node.left;
            const baseIdx = 2 * cur.baseIdx;
            const level = cur.level + 1;
            levels[level] = levels[level] || { startIdx: baseIdx, length: 1 };
            levels[level] = {
                ...levels[level],
                length: baseIdx - levels[level].startIdx + 1,
            };

            maxWidth = Math.max(maxWidth, levels[level].length);
            queue.push({ node, baseIdx, level });
        }

        if (cur.node.right) {
            const node = cur.node.right;
            const baseIdx = 2 * cur.baseIdx + 1;
            const level = cur.level + 1;
            levels[level] = levels[level] || { startIdx: baseIdx, length: 1 };
            levels[level] = {
                ...levels[level],
                length: baseIdx - levels[level].startIdx + 1,
            };

            maxWidth = Math.max(maxWidth, levels[level].length);
            queue.push({ node, baseIdx, level });
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
