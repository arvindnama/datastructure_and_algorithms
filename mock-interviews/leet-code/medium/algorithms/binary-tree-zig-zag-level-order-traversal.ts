/**
 * Given the root of a binary tree, return the zigzag level order traversal of its nodes' values. (i.e., from left to right, then right to left for the next level and alternate between).
 */

import { createTree, TreeNode } from '../../../../models/leet-code.models';

function zigzagLevelOrder(root: TreeNode | null): number[][] {
    /**
     * we need to perform a BFS traversal (record level)
     * level is odd , push elements to start of list
     * level is even , push elements to end of the list
     */

    if (!root) return [];

    const queue: Array<{ node: TreeNode; level: number }> = [
        { node: root, level: 0 },
    ];
    const res: Array<number[]> = [];
    while (queue.length) {
        const n = queue.shift() as { node: TreeNode; level: number };
        res[n.level] = res[n.level] || [];
        if (n.level % 2 === 0) {
            //even , push to end of res[level].
            res[n.level].push(n.node.val);
        } else {
            //even , push to start res[level].
            res[n.level].unshift(n.node.val);
        }

        if (n.node.left) queue.push({ node: n.node.left, level: n.level + 1 });
        if (n.node.right)
            queue.push({ node: n.node.right, level: n.level + 1 });
    }

    return res;
}

const root = createTree([3, 9, 20, null, null, 15, 7]);
console.log(zigzagLevelOrder(root));
