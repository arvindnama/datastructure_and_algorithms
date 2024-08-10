/**
 *  Demo insertion into AVL tree.
 */

import {
    printTree,
    TreeNode,
    TreeNumNode,
} from '../../../../../models/tree.models';

interface AvlTreeNode<T> extends TreeNode<T> {
    height: number;
}

type AvlNumTreeNode = AvlTreeNode<number>;

const asAvl = (n: Nullable<TreeNumNode>): AvlNumTreeNode => n as AvlNumTreeNode;
const getHeight = (n: Nullable<TreeNumNode>): number => asAvl(n)?.height ?? 0;

const recalculateHeight = (n: AvlNumTreeNode) => {
    if (!n) return 0;
    n.height = 1 + Math.max(getHeight(n.left), getHeight(n.right));
};

const getBalancingFactor = (n: AvlNumTreeNode): number => {
    if (!n) return 0;
    return getHeight(n.right) - getHeight(n.left);
};

const rotateRight = (z: AvlNumTreeNode): AvlNumTreeNode => {
    /**
     *       z                   y
     *     /  \                /  \
     *    y   T3    ===>      T1   z
     *   / \                      / \
     *  T1  T2                   T2  T3
     */
    const y = asAvl(z.left);
    const t2 = asAvl(y.right);

    y.right = z;
    z.left = t2;

    recalculateHeight(y);
    recalculateHeight(z);

    return y;
};

const rotateLeft = (z: AvlNumTreeNode): AvlNumTreeNode => {
    /**
     *      z                          y
     *     / \                       /  \
     *    T1  y        ====>        z    T3
     *       / \                   / \
     *      T2  T3                T1  T2
     */
    const y = asAvl(z.right);
    const t2 = asAvl(y.left);

    y.left = z;
    z.right = t2;

    recalculateHeight(y);
    recalculateHeight(z);

    return y;
};

const insertIntoAvl = (
    root: Nullable<AvlNumTreeNode>,
    k: number
): AvlNumTreeNode => {
    const node: AvlNumTreeNode = {
        value: k,
        height: 1,
    };
    if (!root) return node;

    if (root.value > k) root.left = insertIntoAvl(asAvl(root.left), k);
    else if (root.value < k) root.right = insertIntoAvl(asAvl(root.right), k);
    else return root; // duplicate entry, no change to tree.

    // a node was inserted we will need to recalculate the height.
    recalculateHeight(root);

    const bf = getBalancingFactor(root);

    /**
     * bf of -1, 0, +1 are considered as balanced tree (as height diff is 1 or 0)
     * if bf is -2 or 2 it is imbalanced and we need to balance it by rotation the tree
     *
     * bf === -2 means left subtree is taller than right
     * bf === 2 means right subtree is taller than left
     */

    /**
     * In case of imbalanced tree
     * we will need to figure of z,y & x nodes to determine what kind of
     * rotations are needed.
     */
    if (bf < -1) {
        /**
         * z = root,
         * y = root.left ==> left is taller
         * x = y.left or y.right
         *     y.left ==> if left sub of y is taller (or the sub tree where k was added)
         *     y.right ==> if right sub of y is taller (or the sub tree where k was added)
         */
        const [z, y] = [root, asAvl(root.left)];
        if (k < y.value) {
            // const x = y.left; left is taller as that is where k was added
            // Rotation :: we will need 1 rotation here Right rotation at z
            root = rotateRight(z);
        } else {
            // const x = y.right; right is taller as that is where k was added
            // Rotation :: we will need 1 rotation here Right rotation at z
            root.left = rotateLeft(y);
            root = rotateRight(z);
        }
    } else if (bf > 1) {
        /**
         * z = root
         * y = root.right
         * x => y.left or y.right
         *      y.left ==> k was added to left side of sub tree
         *      y.right ==> k was added to right side of sub tree
         */

        const [z, y] = [root, asAvl(root.right)];
        if (k > y.value) {
            // x = y.right
            root = rotateLeft(z);
        } else {
            // x = y.left
            root.right = rotateRight(y);
            root = rotateLeft(z);
        }
    }

    return root;
};

console.log('AVL Tree insert operation');

console.log('insert 10');
let avlTree = insertIntoAvl(null, 10);
printTree(avlTree);

console.log('insert 20');
insertIntoAvl(avlTree, 20);
printTree(avlTree);

console.log('insert 30');
avlTree = insertIntoAvl(avlTree, 30);
printTree(avlTree);

console.log('insert 40');
avlTree = insertIntoAvl(avlTree, 40);
printTree(avlTree);

console.log('insert 50');
avlTree = insertIntoAvl(avlTree, 50);
printTree(avlTree);

console.log('insert 25');
avlTree = insertIntoAvl(avlTree, 25);
printTree(avlTree);
