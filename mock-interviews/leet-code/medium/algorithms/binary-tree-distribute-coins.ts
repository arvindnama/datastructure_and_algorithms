/**
 * You are given the root of a binary tree with n nodes where each node in the tree has node.val coins. There are n coins in total throughout the whole tree.

In one move, we may choose two adjacent nodes and move one coin from one node to another. A move may be from parent to child, or from child to parent.

Return the minimum number of moves required to make every node have exactly one coin.
 */

import { createTree, TreeNode } from '../../../../models/leet-code.models';

function distributeCoins(root: TreeNode | null): number {
    /**
     * Only leaf node can tell for certain how much it needs or has in excess.
     * start from leaf is the optimal here , DFS
     * each node need to report its excess / deficit to its parent - hence post order.
     *
     * total no. of moves:
     *   if child node reports 0 excess / deficit then we dont need to make a move to that
     *   node.
     *   if a child reports 1 excess we still need to move from bottom up 1 move to get that
     *   excess
     *  if a child reports 1 deficit we need to move one down
     *
     *  moves needed for a give node is sum of abs (excess / deficit)
     *  total moves is sum of moves at all nodes.
     */

    let totalMoves = 0;

    const dfs = (root: TreeNode | null): number => {
        if (!root) return 0;
        const left = dfs(root.left);
        const right = dfs(root.right);
        const curMoves = Math.abs(left) + Math.abs(right);
        totalMoves += curMoves;
        // defect / excess at root is
        return root.val + left + right - 1; // cos i just need one all other can be given
    };
    dfs(root);
    return totalMoves;
}

let root = createTree([3, 0, 0]);
console.log(distributeCoins(root));

root = createTree([0, 3, 0]);
console.log(distributeCoins(root));

root = createTree([2, 2, 0, null, null, 0]);
console.log(distributeCoins(root));
