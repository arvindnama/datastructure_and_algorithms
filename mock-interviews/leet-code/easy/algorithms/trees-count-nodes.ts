/**
 * Given the root of a complete binary tree, return the number of the nodes in the tree.
 */

import { createTree, TreeNode } from '../../../../models/leet-code.models';

function countNodes(root: TreeNode | null): number {
    /**
     * assumptions: height of single node is 0 (for the sake of calculations)
     *
     * height of the tree can be calculated by navigation down the left child
     * get the the height of root and right child .
     *
     * check if height of the right sub tree is one less than whole tree,
     * i.e. both left subtree and right sub tree are of same height
     *
     *     if yes==> last node is on the right side of the tree.
     *      we take all node of left sub tree + 1 root + recurse right sub tree
     *     if no==> last node is on the left side of the tree.
     *      we take all the nodes of right sub tree + 1 root + recuse left sub tree
     */

    if (!root) return 0;

    // height of leaf is zero
    const height = (root: TreeNode | null): number => {
        return !root ? -1 : 1 + height(root.left);
    };

    const nodeInFullTree = (height: number) => 2 ** (height + 1) - 1;

    const treeHeight = height(root);
    const rightSubTreeHeight = height(root.right);

    const isLeftNRightHeightSame = treeHeight - rightSubTreeHeight === 1;

    if (isLeftNRightHeightSame) {
        // count all nodes in left subtree + 1 root.
        const leftSubtreeNodes = nodeInFullTree(rightSubTreeHeight);

        return leftSubtreeNodes + 1 + countNodes(root.right);
    }

    // not same , but right sub tree is full tree
    // (else it wont comply with complete binary tree rules)
    // count all nodes in right subtree + 1 root.
    const rightSubtreeNodes = nodeInFullTree(rightSubTreeHeight);
    return rightSubtreeNodes + 1 + countNodes(root.left);
}

let root = createTree([1, 2, 3, 4, 5, 6]);
console.log(countNodes(root));

root = createTree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
console.log(countNodes(root));
