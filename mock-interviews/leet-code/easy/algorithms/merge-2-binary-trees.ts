/**
 * Imagine that when you put one of them to cover the other, some nodes of the two trees are overlapped while the others are not. You need to merge the two trees into a new binary tree. The merge rule is that if two nodes overlap, then sum node values up as the new value of the merged node. Otherwise, the NOT null node will be used as the node of the new tree.

Return the merged tree.

Note: The merging process must start from the root nodes of both trees.
 */

import {
    createTree,
    printTree,
    TreeNode,
} from '../../../../models/leet-code.models';

function mergeTrees(
    root1: TreeNode | null,
    root2: TreeNode | null
): TreeNode | null {
    if (!root1 && root2) return root2;
    if (root1 && !root2) return root1;
    if (!root1 && !root2) return null;

    const root = new TreeNode();
    root.val = (root1?.val as number) + (root2?.val as number);
    root.left = mergeTrees(root1?.left as TreeNode, root2?.left as TreeNode);
    root.right = mergeTrees(root1?.right as TreeNode, root2?.right as TreeNode);
    return root;
}

const left = createTree([1, 3, 2, 5]);
const right = createTree([2, 1, 3, null, 4, null, 7]);

console.log(printTree(mergeTrees(left, right)));
