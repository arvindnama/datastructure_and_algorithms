import { createTree, TreeNode } from '../../../../../models/leet-code.models';

const inorderTraverse = (root: TreeNode): number[] => {
    /**
     *  left , root & right
     *
     *      1
     *   2    3
     * 4  5  6 7
     *
     * in: 4,2,5,1,6,3,7
     *
     * cur , stack
     * cur hold hold left child,
     *  as long as we have left child we down then path and keep pushing the cur node
     * to stack
     *
     * where there are no more pop from stack (root) repeat the above on root.right.
     */
    if (!root) return [];
    const res = [];
    const stack: TreeNode[] = [];
    let cur = root;
    while (cur || stack.length) {
        if (cur) {
            stack.push(cur);
            cur = cur.left as TreeNode;
        } else {
            const temp = stack.pop()!;
            res.push(temp.val);
            cur = temp.right as TreeNode;
        }
    }
    return res;
};

/*
 *       1
 *     2    3
 *   4  5  6 7
 *
 *   cur = 1 , stack = []
 *   cur = 2 , stack = [1]
 *   cur = 4 , stack = [2,1]
 *   cur = null , stack = [4,2,1]
 *   cur = null , stack = [2,1] res = [4]
 *   cur = 5 , stack = [1] res = [4,2]
 *   cur = null , stack = [5,1] res = [4,2]
 *   cur = null , stack = [1] res = [4,2,5]
 *   cur = 3 , stack = [] res = [4,2,5,1]
 *   cur = 6 , stack = [3] res = [4,2,5,1]
 *   cur = null , stack = [6,3] res = [4,2,5,1]
 *   cur = null , stack = [3] res = [4,2,5,1,6]
 *
 *
 */

const root = createTree([1, 2, 3, 4, 5, 6, 7]);
console.log(inorderTraverse(root));
