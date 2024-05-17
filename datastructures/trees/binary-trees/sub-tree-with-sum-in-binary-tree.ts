/**
 * You are given a binary tree and a given sum. The task is to check if there exists a subtree whose sum of all nodes is equal to the given sum.
 */

import { TreeNode, createTree, printTree } from '../../../models/tree.models';

function isSubTreeWithSumFound(r: TreeNode<number>, sum: number): boolean {
    const internalFn = (
        r: Nullable<TreeNode<number>>
    ): { sum: number; matchFound: boolean } => {
        if (!r) return { sum: 0, matchFound: sum === 0 };
        if (!r.right && !r.left)
            return { sum: r.value, matchFound: sum === r.value };

        const leftRes = internalFn(r.left);
        const rightRes = internalFn(r.right);

        const sumOfNode = r.value + leftRes.sum + rightRes.sum;
        return {
            matchFound:
                leftRes.matchFound || rightRes.matchFound || sumOfNode === sum,
            sum: sumOfNode,
        };
    };

    return internalFn(r).matchFound;
}

const r = createTree([1, 3, 6, 5, 9, 8]);
printTree(r);
console.log('sub tree with sum(17) found', isSubTreeWithSumFound(r, 17));
console.log('sub tree with sum(11) found', isSubTreeWithSumFound(r, 11));
