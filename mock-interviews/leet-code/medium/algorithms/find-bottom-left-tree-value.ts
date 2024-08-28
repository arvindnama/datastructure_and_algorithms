/**
 * Given the root of a binary tree, return the leftmost value in the last row of the tree.
 */

import { createTree, TreeNode } from '../../../../models/leet-code.models';

function findBottomLeftValue(root: TreeNode | null): number | null {
    /**
     * traverse bfs on the tree.
     * and record the level as we put to the queue.
     * when we dequeue , store the result in a array with level as idx
     *
     * at the end pop from array and take first element from popped array.
     */
    if (!root) return null;
    const queue: { level: number; node: TreeNode }[] = [
        { level: 0, node: root },
    ];
    const res: number[] = [];
    while (queue.length) {
        const { node, level } = queue.shift() as {
            level: number;
            node: TreeNode;
        };

        if (res[level] === undefined) res[level] = node.val;

        if (node.left) queue.push({ node: node.left, level: level + 1 });
        if (node.right) queue.push({ node: node.right, level: level + 1 });
    }

    return res[res.length - 1];
}

let t1 = createTree([2, 1, 3]);
console.log(findBottomLeftValue(t1));

t1 = createTree([
    1,
    2,
    3,
    4,
    null,
    5,
    6,
    null,
    null,
    null,
    null,
    null,
    null,
    7,
]);
console.log(findBottomLeftValue(t1));
