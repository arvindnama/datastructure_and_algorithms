/**
 * Given the root of a complete binary tree, return the number of the nodes in the tree.
 */

import { createTree, TreeNode } from '../../../../../models/leet-code.models';

function countNodes(root: TreeNode | null): number {
    /**
     * In a complete binary tree , all levels except the last is filled.
     * & in the last level left most will be filled and right can be empty.
     *
     * height of a full binary tree of height h is 2 ** (h + 1) -1
     *
     * A complete binary tree.
     *   if left sub tree's height is same as right sub tree's hight
     *     then left sub tree is complete binary tree
     *          nodes(root) = nodesInFullTree(root-left-height) + 1 + nodes(root.right)
     *    else
     *         node(root) = nodes(root.left)+ 1 + nodesInFullTree(root-right-height)
     */

    if (!root) return 0;

    const height = (root: TreeNode | null): number =>
        !root ? -1 : 1 + height(root.left);
    const nodesInFullBT = (h: number): number => 2 ** (h + 1) - 1;

    const rootHeight = height(root);
    const rightHeight = height(root.right);

    const isLeftHeightSameAsRight = rootHeight - rightHeight === 1;

    if (isLeftHeightSameAsRight) {
        // this means left is a full binary tree and right is incomplete
        return 1 + nodesInFullBT(rightHeight) + countNodes(root.right);
    }

    // left is incomplete & right is complete
    return 1 + countNodes(root.left) + nodesInFullBT(rightHeight);
}

let root = createTree([1, 2, 3, 4, 5, 6]);
console.log(countNodes(root));

root = createTree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
console.log(countNodes(root));
