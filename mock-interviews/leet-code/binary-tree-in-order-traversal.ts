/**
 * Given the root of a binary tree, return the inorder traversal of its nodes' values.
 */

import { TreeNode, createTree } from '../../models/leet-code.models';

function inorderTraversal(root: TreeNode | null): number[] {
    if (!root) return [];

    const res: number[] = [];
    /**
     * start with an empty stack and a cur pointer (starting with root)
     * while stack is not empty or cur pointer (to root) is not null
     * if cur pointer is not null , push to top of stack and move to its left child
     * else cur pointer is null, no more left child , print top most on stack
     * and mark cur pointer to right child of stack & repeat the process
     */

    let n: TreeNode | null = root;
    const stack: TreeNode[] = [];
    while (stack.length || n) {
        if (n) {
            stack.push(n);
            n = n.left;
        } else {
            const c = stack.pop() as TreeNode;
            res.push(c.val);
            n = c.right;
        }
    }
    return res;
}

function preorderTraversal(root: TreeNode | null): number[] {
    if (!root) return [];

    const res: number[] = [];
    const queue: TreeNode[] = [root];
    while (queue.length) {
        const n = queue.shift() as TreeNode;
        res.push(n.val);
        if (n.left) queue.push(n.left);
        if (n.right) queue.push(n.right);
    }

    return res;
}

function postorderTraversal(root: TreeNode | null): number[] {
    if (!root) return [];

    /**
     * use a stack push root on top.
     *
     * pop the top element push the left and right child (in order) onto stack
     * push the poped element to result array
     * repeat till stack is not empty
     *
     * now reverse the recorded array , this is postorder
     */

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
console.log(inorderTraversal(root));

root = createTree([1, 2, 3, 4, 5, 6, 7]);
console.log(inorderTraversal(root));

root = createTree([1]);
console.log(inorderTraversal(root));

root = createTree([1, null, 2, null, null, 3]);
console.log(preorderTraversal(root));

root = createTree([1, 2, 3, 4, 5, 6, 7]);
console.log(preorderTraversal(root));

root = createTree([1, null, 2, null, null, 3]);
console.log(postorderTraversal(root));

root = createTree([1, 2, 3, 4, 5, 6, 7]);
console.log(postorderTraversal(root));
