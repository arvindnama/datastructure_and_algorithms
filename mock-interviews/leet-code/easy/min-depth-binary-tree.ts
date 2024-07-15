/**
 * Given a binary tree, find its minimum depth.

The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.

Note: A leaf is a node with no children.

 */

import { createTree, TreeNode } from '../../../models/leet-code.models';

function minDepth(root: TreeNode | null): number {
    if (!root) return 0;
    if (!root.left && !root.right) return 1;
    const mLeft = minDepth(root.left);
    const mRight = minDepth(root.right);
    if (mLeft === 0) return 1 + mRight;
    if (mRight === 0) return 1 + mLeft;
    const m = 1 + Math.min(mLeft, mRight);

    return m;
}

let root = createTree([3, 9, 20, null, null, 15, 7]);
console.log(minDepth(root));

root = createTree([2, null, 3, null, null, null, 4]);
console.log(minDepth(root));
