/**
 *  Demo deletion into AVL tree.
 */

import { AvlTree } from '../../../../../models/avl-tree.models';
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

const recalculateHeight = (n: Nullable<TreeNumNode>) => {
    if (!n) return;
    asAvl(n).height = 1 + Math.max(getHeight(n.left), getHeight(n.right));
};

const getBalancingFactor = (n: Nullable<TreeNumNode>): number => {
    if (!n) return 0;
    return getHeight(n.right) - getHeight(n.left);
};

const getInorderSuccessor = (n: AvlNumTreeNode): AvlNumTreeNode => {
    let temp = asAvl(n.right);
    while (temp.left) temp = asAvl(temp.left);
    return temp;
};

const leftRotate = (z: AvlNumTreeNode): AvlNumTreeNode => {
    /**
     *       z
     *      / \
     *    t1   y
     *        / \
     *      t2  t3
     */
    const y = asAvl(z.right);
    const t2 = asAvl(y.left);

    y.left = z;
    z.right = t2;

    recalculateHeight(z);
    recalculateHeight(y);

    return y;
};

const rightRotate = (z: AvlNumTreeNode): AvlNumTreeNode => {
    /**
     *       z
     *      / \
     *     y   t3
     *    / \
     *  t1  t2
     */
    const y = asAvl(z.left);
    const t2 = asAvl(y.right);

    y.right = z;
    z.left = t2;

    recalculateHeight(z);
    recalculateHeight(y);

    return y;
};

const deleteFromAvl = (
    root: Nullable<AvlNumTreeNode>,
    k: number
): Nullable<AvlNumTreeNode> => {
    if (!root) return root;

    if (root.value > k) root.left = deleteFromAvl(asAvl(root.left), k);
    else if (root.value < k) root.right = deleteFromAvl(asAvl(root.right), k);
    else {
        // found the node , delete it
        if (!root.left && !root.right) return null;
        else if (!root.left) root = asAvl(root.right);
        else if (!root.right) root = asAvl(root.left);
        else {
            // both children are present.
            // replace the root with in-order successor and delete
            // the in-order successor from root.right
            const ios = getInorderSuccessor(root);
            root.value = ios.value;
            root.right = deleteFromAvl(asAvl(root.right), ios.value);
        }
    }

    recalculateHeight(root);
    const bf = getBalancingFactor(root);

    if (bf < -1) {
        const [z, y] = [root, asAvl(root.left)];
        if (getBalancingFactor(y) <= 0) {
            // x is left sub tree
            root = rightRotate(z);
        } else {
            // x is right sub tree
            root.left = leftRotate(y);
            root = rightRotate(z);
        }
    } else if (bf > 1) {
        const [z, y] = [root, asAvl(root.right)];
        if (getBalancingFactor(y) >= 0) {
            // x is on right sub tree
            root = leftRotate(z);
        } else {
            root.right = rightRotate(y);
            root = leftRotate(z);
        }
    }
    return root;
};

const avlTree = new AvlTree();
avlTree.insert(9);
avlTree.insert(5);
avlTree.insert(10);
avlTree.insert(0);
avlTree.insert(6);
avlTree.insert(11);
avlTree.insert(-1);
avlTree.insert(1);
avlTree.insert(2);

console.log('AVL Tree');
avlTree.print();

console.log('****** Deleting from AVL printTree******');

console.log('Delete 10 from root');
let root = avlTree.getRoot();
root = deleteFromAvl(root, 10);
printTree(root);

console.log('Delete 9 from root');
root = deleteFromAvl(root, 9);
printTree(root);
