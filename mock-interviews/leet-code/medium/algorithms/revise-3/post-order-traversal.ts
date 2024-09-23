import { createTree, TreeNode } from '../../../../../models/leet-code.models';

const postorderTraversal = (root: TreeNode): number[] => {
    /**
     * left , right , root
     *      1
     *    2   3
     *  4  5 6  7
     *
     * post: 4,5,2,6,7,1
     *
     * stack = [1] res = []
     * stack = [3,2] res = [1]
     * stack = [7,6,2] res = [1,3]
     * stack = [6,2] res = [1,3,7]
     * stack = [2] res = [1,3,7,6]
     * stack = [5,4] res = [1,3,7,6,2]
     * stack = [4] res = [1,3,7,6,2,5]
     * stack = [] res = [1,3,7,6,2,5,4]
     */

    if (!root) return [];
    const res = [];
    const stack = [root];

    while (stack.length) {
        const temp = stack.pop()!;
        res.push(temp.val);
        if (temp.left) stack.push(temp.left);
        if (temp.right) stack.push(temp.right);
    }
    return res.reverse();
};

const root = createTree([1, 2, 3, 4, 5, 6, 7]);
console.log(postorderTraversal(root));
