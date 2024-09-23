import { createTree, TreeNode } from '../../../../../models/leet-code.models';

const preorderTraverse = (root: TreeNode): number[] => {
    /**
     *  root ,left & right
     *
     *      1
     *   2    3
     * 4  5  6 7
     *
     * pre: 1,2,4,5,3,6,7
     *
     * stack: [1] res = []
     * stack: [2,3] res = [1]
     * stack: [4,5,3] res = [1,2]
     * stack: [5,3] res = [1,2,4]
     *
     */

    if (!root) return [];
    const res = [];
    const stack = [root];
    while (stack.length) {
        const temp = stack.pop()!;
        res.push(temp.val);
        if (temp.right) stack.push(temp.right);
        if (temp.left) stack.push(temp.left);
    }
    return res;
};

const root = createTree([1, 2, 3, 4, 5, 6, 7]);
console.log(preorderTraverse(root));
