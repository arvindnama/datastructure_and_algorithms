/**
 * Given the root of a binary tree, return the postorder traversal of its nodes' values.
 */

import { createTree, TreeNode } from '../../models/leet-code.models';

function postorderTraversal(root: TreeNode | null): number[] {
    if (!root) return [];

    const res: number[] = [];
    const stack: TreeNode[] = [root];
    while (stack.length) {
        const n = stack.pop() as TreeNode;
        res.push(n.val);
        if (n.left) stack.push(n.left);
        if (n.right) stack.push(n.right);
    }

    return res.reverse();
}

let root = createTree([1, null, 2, null, null, 3]);
console.log(postorderTraversal(root));

root = createTree([]);
console.log(postorderTraversal(root));

root = createTree([1]);
console.log(postorderTraversal(root));
