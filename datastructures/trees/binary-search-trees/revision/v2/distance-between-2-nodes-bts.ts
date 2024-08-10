/**
 * Given a Binary Search Tree and two keys in it. Find the distance between two nodes with given two keys. It may be assumed that both keys exist in BST.
 */

import { createTree, TreeNumNode } from '../../../../../models/tree.models';

/**
 * We need to first find the Least common ancestor.
 * i.e. a Node where one node is less than LCA node and other is greater.
 * if a & b > cur node then move right
 * if a & b < cur node then move left
 * else if on is less and other is greater the cur node is LCA.
 *    now find the distance of a from LCA node and distance of b from LCA node
 *    and add them up
 */
const findDistance = (root: TreeNumNode, a: number, b: number): number => {
    const findLCA = (root: Nullable<TreeNumNode>): Nullable<TreeNumNode> => {
        if (!root) return root;
        if (a < root.value && b < root.value) {
            return findLCA(root.left);
        } else if (a > root.value && b > root.value) {
            return findLCA(root.right);
        } else {
            return root;
        }
    };

    const lca = findLCA(root);
    if (!lca) return -1;

    const distance = (
        root: Nullable<TreeNumNode>,
        a: number,
        dist: number
    ): number => {
        if (!root) return 0;
        if (root.value === a) return dist;
        if (root.value < a) return distance(root.right, a, dist + 1);
        return distance(root.left, a, dist + 1);
    };

    const distA = distance(lca, a, 0);
    const distB = distance(lca, b, 0);
    return distA + distB;
};

const root = createTree([
    5,
    2,
    12,
    1,
    3,
    9,
    21,
    null,
    null,
    null,
    null,
    null,
    null,
    19,
    25,
]) as TreeNumNode;

console.log(findDistance(root, 3, 9));
console.log(findDistance(root, 9, 25));
