import { TreeNode, TreeNumNode, printTree } from './tree.models';

interface AvlTreeNode<T> extends TreeNode<T> {
    height: number;
}

type AvlNumTreeNode = AvlTreeNode<number>;

const asAvl = (n: Nullable<TreeNumNode>) => n as AvlNumTreeNode;
const height = (n: Nullable<TreeNumNode>) => asAvl(n)?.height ?? 0;
const balanceFactor = (n: Nullable<TreeNumNode>): number => {
    if (!n) return 0;
    return height(n.right) - height(n.left);
};

const recalculateHeight = (n: Nullable<TreeNumNode>): void => {
    if (!n) return;
    asAvl(n).height = 1 + Math.max(height(n.left), height(n.right));
};

const leftRotate = (z: Nullable<TreeNumNode>): AvlNumTreeNode => {
    const y = asAvl(z).right;
    const t = asAvl(y).left;

    asAvl(y).left = z;
    asAvl(z).right = t;

    // after rotation, heights will change, hence recalculate
    recalculateHeight(z);
    recalculateHeight(y);

    return asAvl(y); // the new root
};

const rightRotate = (z: Nullable<TreeNumNode>): AvlNumTreeNode => {
    const y = asAvl(z).left;
    const t = asAvl(y).right;

    asAvl(y).right = z;
    asAvl(z).left = t;

    // after rotation, heights will change, hence recalculate
    recalculateHeight(z);
    recalculateHeight(y);

    return asAvl(y); // the new root
};

const inOrderSuccessor = (n: TreeNumNode): AvlNumTreeNode => {
    let ios = n.right;
    while (ios?.left) {
        ios = ios.left;
    }
    return asAvl(ios);
};

function insertIntoAvl(
    root: Nullable<AvlNumTreeNode>,
    k: number
): AvlNumTreeNode {
    const node: AvlNumTreeNode = {
        value: k,
        height: 1,
    };
    if (!root) return node;

    // add node like adding into a BST

    if (k < root.value) {
        root.left = insertIntoAvl(asAvl(root.left), k);
    } else if (k > root.value) {
        root.right = insertIntoAvl(asAvl(root.right), k);
    } else return root; // duplicate node just return as there is no change to tree

    // readjust the height the newly modified node (root) as there is a new entry
    recalculateHeight(root);

    // check if the root node is unbalanced , if so rotate it to balance the tree
    const bf = balanceFactor(root);

    /**
     * for a node to be a BST , its balancing factor should be either 0, +1 or -1
     * if bf is -2 or 2 , they are considered non BST (imbalanced)
     * `-ve` indicates that left tree is taller than right
     * `+ve` indicates that right tree is taller than left
     */
    if (bf < -1) {
        // left subtree is taller than right sub tree
        // z is root
        // y is left child of z
        // we need to find x (lets check on which sub tree of y k was added)
        if (k < asAvl(root.left).value) {
            // k is somewhere on the left subtree of y , Hence
            // x is left child of y
            // this is a Left Left imbalance tree, Rotate once
            //  1. Rotate right at root z
            root = rightRotate(root);
        } else {
            // k is somewhere on the right of y's subtree , Hence
            // x is right child of y
            // This is a left right imbalanced tree, Rotate 2 times :
            // 1. Rotate right at y
            // 2. Rotate left at z
            root.left = leftRotate(root.left);
            root = rightRotate(root);
        }
    } else if (bf > 1) {
        // right subtree is taller than left.
        // z is root
        // y is right child of z
        // we need to determine x (lets check which subtree of y k was added)

        if (k > asAvl(root.right).value) {
            // k is in the right sub tree of y
            // x is right child of y
            // this is a right right imbalance tree, one rotation needed.
            // 1. Rotate to left at z
            root = leftRotate(root);
        } else {
            // K is to the left of y
            // x is left child of y
            // this is a right left imbalanced tree, rotate twice
            // 1. Rotate to right at y
            // 2. Rotate to left at z
            root.right = rightRotate(root.right);
            root = leftRotate(root);
        }
    }
    return root;
}

function deleteFromAvlTree(
    root: Nullable<AvlNumTreeNode>,
    k: number
): Nullable<AvlNumTreeNode> {
    // Delete like any other BST deletion.
    if (!root) return null;

    if (k < root.value) {
        root.left = deleteFromAvlTree(asAvl(root.left), k);
    } else if (k > root.value) {
        root.right = deleteFromAvlTree(asAvl(root.right), k);
    } else {
        // we are at the node that needs to be deleted.
        // 4 possibilities
        // 1. node is a leaf :: nullify the curr-node.
        // 2. node with only right child:: replace cur node with left child
        // 3. node with only left child:: replace cur node with right child
        // 4. node with only left child:: replace cur node with its InOrder successor & delete the InOrderSuccessor

        if (!root.left && !root.right) root = null;
        else if (!root.right) root = asAvl(root.left);
        else if (!root.left) root = asAvl(root.right);
        else {
            // both children are present
            const ios = inOrderSuccessor(root);
            root.value = ios.value;
            root.right = deleteFromAvlTree(asAvl(root.right), ios.value);
        }

        // eventually all deletions are done at left node or parent of leaf node.
        // since the node to be deleted is directly replaced by its child, we dont explicitly
        // have to decrement the height (but the there is a height mismatch , we still need to recalculate)
    }

    if (!root) return null; // we delete a leaf node , this will not cause any imbalance

    recalculateHeight(root);

    /**
     * BF always tells if the node is balanced or not i.e BST or not.
     * if bf is either 0, +1 , -1 they are considered balanced (as height diff is at max 1)
     * if bf is -2 or 2 , then there is an imbalance
     * -ve means left subtree is tall,
     * +ve means right subtree is tall
     */
    const bf = balanceFactor(root);

    if (bf < -1) {
        // left subtree is taller, and deletion happened somewhere on the right subtree.
        // z is root
        // y has to be the subtree that is tallest , in this case it is left child of root (cos deletion happened on right side)
        // we need to find x => and x will also be subtree of y that is tallest
        // for this we need to get the bf of y
        // if bf(y) = -1 left child is tallest so we left-child => Left-Left case => 1 rotation
        // if bf(y) = 1 right child is tallest so pick right-child => Left-Right case => 2 rts
        // if bf(y) = 0 , we go with left child cos only 1 rotation is needed.

        if (balanceFactor(root.left) <= 0) {
            // x is left child of y .
            // rotate once to right
            root = rightRotate(root);
        } else {
            // x is right child of y
            // rotate twice
            root.left = leftRotate(root.left);
            root = rightRotate(root);
        }
    } else if (bf > 1) {
        // right subtree is tallest.
        // z is root
        // y is right-child of z (cos it is the tallest here & deletion happened on left subtree)
        // x we need to find out ..
        // x should also be the tallest child of `y`
        // for this we get the BF of y and
        // if bf(y) == 1 then right-child is taller ==> Right-Right case -> 1 rts
        // if bf(y) == -1 then left-child is taller ==> Right-Left case -> 2 rts
        // if bf(y) == 0 same height ==> we pick right-child cos 1 rts is enough

        if (balanceFactor(root.right) >= 0) {
            // x is right-child of y
            root = leftRotate(root);
        } else {
            // x is left-child of y
            root.right = rightRotate(root.right);
            root = leftRotate(root);
        }
    }
    return root;
}

export class AvlTree {
    #root: Nullable<AvlNumTreeNode>;

    public insert(k: number) {
        this.#root = insertIntoAvl(this.#root, k);
    }

    public delete(k: number) {
        this.#root = deleteFromAvlTree(this.#root, k);
    }

    public print() {
        printTree(this.#root);
    }
}
