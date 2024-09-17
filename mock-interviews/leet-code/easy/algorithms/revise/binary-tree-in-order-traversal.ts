/**
 * Given the root of a binary tree, return the inorder traversal of its nodes' values.
 */
import { TreeNode, createTree } from '../../../../../models/leet-code.models';

function inorderTraversal(root: TreeNode | null): number[] {
    /**
     *       1
     *    2     3
     *  4  5   6  7
     *
     * in-order: left , root & right
     *
     * 1 2 4 5 3 6 7
     *
     * cur = 1 stack = []  res = []
     * cur = 2 stack = [1]  res = []
     * cur = 4 stack = [2,1]  res = []
     * cur = null stack = [4,2,1]  res = []
     * cur = null stack = [2,1]  res = [4]
     * cur = 5 stack = [1]  res = [4, 2]
     * cur = null stack = [5,1]  res = [4, 2]
     * cur = null stack = [1]  res = [4, 2, 5]
     * cur = 3 stack = []  res = [4, 2, 5, 1]
     * cur = 6 stack = [3]  res = [4, 2, 5, 1]
     * cur = null stack = [6,3]  res = [4, 2, 5, 1]
     * cur = null stack = [3]  res = [4, 2, 5, 1,6]
     * cur = 7 stack = []  res = [4, 2, 5, 1,6,3]
     * cur = null stack = [7]  res = [4, 2, 5, 1,6,3]
     * cur = null stack = []  res = [4, 2, 5, 1,6,3,7]
     */

    const res: number[] = [];
    if (!root) return [];
    const stack: TreeNode[] = [];
    let cur = root;
    while (cur || stack.length) {
        if (cur) {
            stack.push(cur);
            cur = cur.left as TreeNode;
        } else {
            const temp = stack.pop()!;
            cur = temp.right as TreeNode;
            res.push(temp.val);
        }
    }
    return res;
}

function preorderTraversal(root: TreeNode | null): number[] {
    /**
     *       1
     *    2     3
     *  4  5   6  7
     *
     * preorder: root , left & right
     *
     * 1, 2, 4, 5, 3, 6, 7
     *
     * stack = [1] res = []
     * stack = [2,3] res = [1]
     * stack = [4,5,3] res = [1,2]
     * stack = [5,3] res = [1,2,4]
     * stack = [3] res = [1,2,4,5]
     * stack = [6,7] res = [1,2,4,5,3]
     * stack = [7] res = [1,2,4,5,3,6]
     * stack = [7] res = [1,2,4,5,3,6,7]
     *
     */

    if (!root) return [];
    const stack: TreeNode[] = [root];
    const res: number[] = [];
    while (stack.length) {
        const temp = stack.pop()!;
        res.push(temp.val);
        if (temp.right) stack.push(temp.right);
        if (temp.left) stack.push(temp.left);
    }
    return res;
}

function postorderTraversal(root: TreeNode | null): number[] {
    /**
     *       1
     *    2     3
     *  4  5   6  7
     *
     * post order: left, right & root
     *
     * 4,5,2,6,7,3,1
     *
     * stack = [1] res = []
     * stack = [3,2] res = [1]
     * stack = [7,6,2] res = [3,1]
     * stack = [6,2] res = [7,3,1]
     * stack = [2] res = [6,7,3,1]
     * stack = [5,4] res = [2,6,7,3,1]
     * stack = [4] res = [5,2,6,7,3,1]
     * stack = [] res = [4,5,2,6,7,3,1]
     */

    if (!root) return [];
    const res: number[] = [];
    const stack: TreeNode[] = [root];
    while (stack.length) {
        const temp = stack.pop()!;
        res.unshift(temp.val);
        if (temp.left) stack.push(temp.left);
        if (temp.right) stack.push(temp.right);
    }

    return res;
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
