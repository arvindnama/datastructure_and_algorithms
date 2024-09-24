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

const getBalancingFactor = (n: Nullable<TreeNumNode>) => {
    if (!n) return 0;
    return getHeight(n.right) - getHeight(n.left);
};

const rotateRight = (z: AvlNumTreeNode): AvlNumTreeNode => {
    /**
     *      z
     *    y   T3
     *  T1  T2
     *
     *     y
     *   T1 z
     *    T2 T3
     */

    const y = asAvl(z.left);
    const t2 = asAvl(y).right;

    y.right = z;
    z.left = t2;

    recalculateHeight(y);
    recalculateHeight(z);
    return y;
};

const getInorderSuccessor = (root: AvlNumTreeNode): AvlNumTreeNode => {
    let temp = root.right!;
    while (temp.left) {
        temp = temp.left;
    }
    return asAvl(temp);
};

const rotateLeft = (z: AvlNumTreeNode): AvlNumTreeNode => {
    /**
     *       z
     *    T3    y
     *       T1  T2
     *
     *     y
     *   z  T2
     * T3  T1
     */

    const y = asAvl(z.right);
    const t1 = asAvl(y.left);

    y.left = z;
    z.right = t1;

    recalculateHeight(y);
    recalculateHeight(z);

    return y;
};

const insertIntoAvl = (
    root: Nullable<AvlNumTreeNode>,
    k: number
): Nullable<AvlNumTreeNode> => {
    const node: AvlNumTreeNode = {
        value: k,
        height: 1,
    };

    if (!root) return node;

    if (k < root.value) root.left = insertIntoAvl(asAvl(root.left), k);
    else if (k > root.value) root.right = insertIntoAvl(asAvl(root.right), k);
    else return root; // duplicate no change needed.

    recalculateHeight(root);

    const bf = getBalancingFactor(root);
    /**
     * bf < -1 , left sub tree is taller than right and is off balance
     * bf > 1 , right sub tree is taller than left and is off balance
     *
     */

    if (bf < -1) {
        /**
         * Rotate to balance the avl tree
         * z = root
         * y = root.left
         * x ??
         */
        const [z, y] = [root, asAvl(root.left)];
        if (k < y.value) {
            // k was inserted on left sub tree of y
            // hence x is y.left
            // x , y , z are on left side of the tree
            // right rotation is needed at z (root)
            root = rotateRight(z);
        } else {
            // x is to right of y
            // 2 rotations , one to rigth y as root
            // left rotate at root.

            root.left = rotateLeft(asAvl(y));
            root = rotateRight(root);
        }
    } else if (bf > 1) {
        /**
         * Rotate to balance the avl tree
         * z = root
         * y = root.right
         * x ??
         */
        const [z, y] = [root, asAvl(root.right)];
        if (k > y.value) {
            // x is to the right of y
            // one rotation is needed to left at root
            root = rotateLeft(z);
        } else {
            // x is to left of y
            // 2 rotations are needed
            // one to right at y
            // one to left at root

            root.right = rotateRight(asAvl(y));
            root = rotateLeft(root);
        }
    }
    return root;
};

const deleteFromAvl = (
    root: Nullable<AvlNumTreeNode>,
    k: number
): Nullable<AvlNumTreeNode> => {
    if (!root) return null;

    if (k < root.value) root.left = deleteFromAvl(asAvl(root.left), k);
    else if (k > root.value) root.right = deleteFromAvl(asAvl(root.right), k);
    else {
        // found the node to delete.
        // node can is leaf
        if (!root.left && !root.right) return null;
        // node has one child
        if (!root.right) root = asAvl(root.left);
        if (!root.right) root = asAvl(root.right);
        // both children are present
        // we find the inorder successor of root
        // replace root's value with inorder successor.
        // deleate ios from right sub tree.
        const ios = getInorderSuccessor(root);
        root.value = ios.value;
        root.right = deleteFromAvl(asAvl(root.right), ios.value);
    }

    recalculateHeight(root);
    const bf = getBalancingFactor(root);

    if (bf < -1) {
        const [z, y] = [root, asAvl(root.left)];
        if (getBalancingFactor(y) <= 0) {
            // left sub tree is taller, x is on left side.
            // one rotation to right is needed.
            root = rotateRight(z);
        } else {
            // right sub-tree is taller, x is to the right side.
            // 2 rotations are needed.
            root.left = rotateLeft(y);
            root = rotateRight(z);
        }
    } else if (bf > 1) {
        const [z, y] = [root, asAvl(root.right)];
        if (getBalancingFactor(y) <= 0) {
            // x is to left of y , 2 rotations needed
            root.right = rotateRight(y);
            root = rotateLeft(z);
        } else {
            // x is to the left , one roataion is enought
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

console.log('****** Deleting from AVL printTree******');

console.log('Delete 10');
avlTree = deleteFromAvl(avlTree, 10);
printTree(avlTree);

console.log('Delete 20');
avlTree = deleteFromAvl(avlTree, 20);
printTree(avlTree);
