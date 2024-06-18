import { AvlNumTreeNode } from '../../../models/avl-tree.models';
import { TreeNumNode, printTree } from '../../../models/tree.models';
import { insertIntoAvl } from './insert';

function deleteFromAvl(
    root: Nullable<AvlNumTreeNode>,
    k: number
): Nullable<AvlNumTreeNode> {
    if (!root) return null;

    const getInOrderSuccessor = (n: AvlNumTreeNode): AvlNumTreeNode => {
        let c = n.right as AvlNumTreeNode;
        while (c.left) {
            c = c.left as AvlNumTreeNode;
        }
        return c;
    };

    const asAvl = (n: Nullable<TreeNumNode>): AvlNumTreeNode =>
        n as AvlNumTreeNode;

    const height = (n: Nullable<TreeNumNode>): number => {
        if (!n) return 0;
        return asAvl(n).height;
    };

    const recalculateHeight = (n: Nullable<TreeNumNode>): number => {
        return Math.max(height(asAvl(n).left), height(asAvl(n).right));
    };

    const balancingFactor = (n: Nullable<TreeNumNode>): number => {
        if (!n) return 0;
        return height(n.right) - height(n.left);
    };

    const leftRotate = (x: Nullable<TreeNumNode>): AvlNumTreeNode => {
        const y = asAvl(asAvl(x).right);
        const t = y.left;

        y.left = x;
        asAvl(x).right = t;

        recalculateHeight(x);
        recalculateHeight(y);

        return y;
    };

    const rightRotate = (x: Nullable<TreeNumNode>): AvlNumTreeNode => {
        const y = asAvl(asAvl(x).left);
        const t = asAvl(y.right);

        y.right = x;
        asAvl(x).left = t;

        recalculateHeight(x);
        recalculateHeight(y);

        return y;
    };

    if (k < root.value) {
        root.left = deleteFromAvl(root.left as AvlNumTreeNode, k);
    } else if (k > root.value) {
        root.right = deleteFromAvl(root.right as AvlNumTreeNode, k);
    } else {
        // delete current node.
        if (!root.left && !root.right) {
            // leaf node
            root = null;
        } else if (!root.left) {
            // only right child is present
            root = root.right as AvlNumTreeNode;
        } else if (!root.right) {
            // only left child is present
            root = root.left as AvlNumTreeNode;
        } else {
            // both child are present.
            // replace current node with InOrder successor
            // & delete InOrder successor

            const ios = getInOrderSuccessor(root);
            root.value = ios.value;
            root.right = deleteFromAvl(root.right as AvlNumTreeNode, ios.value);
        }

        // eventually we are only deleting either
        // 1. leaf node OR
        // 2. parent of a leaf node
        // since the leaf node replaced the deleted node (we don't have to explicitly subtract the height of the node)
    }

    if (!root) return null;

    // since the deletion of node causes the hight to decrease , we will need to recalculate the
    // height of the current node.
    recalculateHeight(root);
    // check for imbalance and balance the node.
    const bf = balancingFactor(root);

    if (bf < -1) {
        // we found an imbalance in the left parent of the subtree where deletion took place
        // z is the root and since left child is tallest (bf -1) y is l.c of z
        if (balancingFactor(root.left) <= 0) {
            // left child of y is tallest hence x is lc of y
            // hence :: y is lc of z & x is lc or y
            // even if root.left has both children with same height (bf === 0), we pick left child of y
            // just so we do only 1 rotation

            root = rightRotate(root);
        } else {
            // right child of y is tallest
            // hence x is rc of y
            // we need to do 2 rotations
            // left rotation at y
            // right rotation at z
            root.left = leftRotate(root.left);
            root.right = rightRotate(root);
        }
    } else if (bf > 1) {
        //we found an imbalance in the right parent of the subtree where deleting happened.
        // z is the root and since bf > 1 , y is the right child of z
        if (balancingFactor(root.right) >= 0) {
            // right child is taller (BF = 1) , hence x is rc of y
            // hence we have y rc of z & z rc of y
            // NOTE: when Bf == 0 i.e. both children of y are equal in height
            // we pick right child of y , just so only 1 rotation is needed.
            // we just need one rotation here left
            root = leftRotate(root);
        } else {
            // left child is taller (Bf === -1) . hence x is rc of y
            // Hence: y rc of z & x rc of y
            // here we need to 2 rotations
            root.right = rightRotate(root.right);
            root = leftRotate(root);
        }
    }
    return root;
}

let root = insertIntoAvl(null, 9);
root = insertIntoAvl(root, 5);
root = insertIntoAvl(root, 10);
root = insertIntoAvl(root, 0);
root = insertIntoAvl(root, 6);
root = insertIntoAvl(root, 11);
root = insertIntoAvl(root, -1);
root = insertIntoAvl(root, 1);
root = insertIntoAvl(root, 2);

console.log('AVL Tree');
printTree(root);

console.log('****** Deleting from AVL printTree******');

console.log('Delete 10 from root');
root = deleteFromAvl(root, 10) as AvlNumTreeNode;
printTree(root);

console.log('Delete 9 from root');
root = deleteFromAvl(root, 9) as AvlNumTreeNode;
printTree(root);
