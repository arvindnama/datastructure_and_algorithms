/**
 * Given a n-ary tree, find its maximum depth.

The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

Nary-Tree input serialization is represented in their level order traversal, each group of children is separated by the null value (See example
 */

import { N_AryTreeNode } from '../../../../models/leet-code.models';

function maxDepth(root: N_AryTreeNode | null): number {
    if (!root) return 0;

    const queue: { n: N_AryTreeNode; level: number }[] = [
        { n: root, level: 1 },
    ];

    let maxDepth = 0;
    while (queue.length) {
        const node = queue.shift() as { n: N_AryTreeNode; level: number };
        // In BFS , we access all nodes one level at a time
        // so the max depth level is accessed at end ,
        // so the last node that is accessed will have the max depth
        maxDepth = node.level;
        for (const child of node.n.children ?? []) {
            queue.push({ n: child, level: node.level + 1 });
        }
    }
    return maxDepth;
}

const root = new N_AryTreeNode(1);
console.log(maxDepth(root));
