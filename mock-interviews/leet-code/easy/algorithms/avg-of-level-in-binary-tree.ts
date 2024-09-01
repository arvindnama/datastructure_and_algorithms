/**
 * Given the root of a binary tree, return the average value of the nodes on each level in the form of an array. Answers within 10-5 of the actual answer will be accepted.
 */

import { createTree, TreeNode } from '../../../../models/leet-code.models';

function averageOfLevels(root: TreeNode | null): number[] {
    if (!root) return [];

    const queue: Array<{ node: TreeNode; level: number }> = [
        { node: root, level: 0 },
    ];
    const res: Array<number[]> = [];

    while (queue.length) {
        const n = queue.shift() as { node: TreeNode; level: number };
        res[n.level] = res[n.level] || [];
        res[n.level].push(n.node.val);
        if (n.node.left) queue.push({ node: n.node.left, level: n.level + 1 });
        if (n.node.right)
            queue.push({ node: n.node.right, level: n.level + 1 });
    }

    return res.map(
        (nodesInLevel) =>
            nodesInLevel.reduce((a, b) => a + b, 0) / nodesInLevel.length
    );
}

const root = createTree([3, 9, 20, null, null, 15, 7]);
console.log(averageOfLevels(root));
