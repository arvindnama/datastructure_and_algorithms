/**
 * Given a binary tree, print boundary nodes of the binary tree Anti-Clockwise starting from the root
 */

import {
    TreeNode,
    createTree,
    printTree,
} from '../../../../../models/leet-code.models';

function boundaryTraversal(root: TreeNode): number[] {
    if (!root) return [];

    const queue: { node: TreeNode; level: number }[] = [
        { node: root, level: 1 },
    ];

    const topDown: number[] = [];
    const bottomupDown: number[] = [];
    let levelEntries: number[] = [];
    while (queue.length) {
        /**
         * process all the nodes at this level in one-go.
         * all we need is first and last of the level.
         */
        const start = queue[0].node;
        /*
         * if there is only one node in level , end is marked null
         */
        const end = queue.length > 1 ? queue[queue.length - 1].node : null;

        /**
         * add start to top down , end to bottom up
         */
        topDown.push(start.val);
        if (end) bottomupDown.push(end.val);

        const n = queue.length;
        const curLevelNodeValues: number[] = [];
        for (let i = 0; i < n; i++) {
            /**
             * also keep track of current level entries
             * if this is lowest level we need that as well.
             */
            const temp = queue.shift()!;
            curLevelNodeValues.push(temp.node.val);
            if (temp.node.left)
                queue.push({ node: temp.node.left, level: temp.level + 1 });
            if (temp.node.right)
                queue.push({ node: temp.node.right, level: temp.level + 1 });
        }
        levelEntries = curLevelNodeValues;
    }

    /**
     * topDown will hold all left nodes
     * bottomUp will hold all right nodes
     * levelEntries all leaf node:
     *    this will also contain left and right .
     *     so we remove first & last.
     */

    levelEntries.shift(); // remove first
    levelEntries.pop(); // remove last

    return [...topDown, ...levelEntries, ...bottomupDown.reverse()];
}

const root = createTree([20, 8, 22, 4, 12, null, 25, 10, 14, 15, 16]);
printTree(root);

console.log(boundaryTraversal(root));
