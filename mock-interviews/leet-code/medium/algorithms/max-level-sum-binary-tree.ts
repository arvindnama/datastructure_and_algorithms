/**
 * Given the root of a binary tree, the level of its root is 1, the level of its children is 2, and so on.

Return the smallest level x such that the sum of all the values of nodes at level x is maximal.
 */

import { createTree, TreeNode } from '../../../../models/leet-code.models';

function maxLevelSum(root: TreeNode | null): number {
    /**
     * maintain a queue and add all the nodes at a level into it.
     *
     * we process all nodes in a level :
     *   compute the sum and compare with max if needed swap (also store the level)
     */

    if (!root) return 0;
    const queue: { node: TreeNode; level: number }[] = [
        { node: root, level: 1 },
    ];

    let [level, maxLevelSum] = [1, root.val];
    while (queue.length) {
        const noOfNodesInLevel = queue.length;

        const curLevel = queue[0].level;
        const curLevelSum = queue.reduce(
            (levelSum, cur) => levelSum + cur.node.val,
            0
        );
        if (curLevelSum > maxLevelSum) {
            [level, maxLevelSum] = [curLevel, curLevelSum];
        }

        for (let i = 0; i < noOfNodesInLevel; i++) {
            const entry = queue.shift()!;
            if (entry.node.left)
                queue.push({ node: entry.node.left, level: curLevel + 1 });
            if (entry.node.right)
                queue.push({ node: entry.node.right, level: curLevel + 1 });
        }
    }
    return level;
}

const root = createTree([1, 7, 8, 7, -8]);
console.log(maxLevelSum(root));
