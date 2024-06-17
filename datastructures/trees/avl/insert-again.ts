import { AvlNumTreeNode } from '../../../models/avl-tree.models';
import { TreeNumNode, printTree } from '../../../models/tree.models';

function insert(root: Nullable<AvlNumTreeNode>, k: number): AvlNumTreeNode {
    const node: AvlNumTreeNode = {
        value: k,
        height: 1,
    };

    if (!root) return node;

    const height = (node: Nullable<TreeNumNode>): number =>
        (node as AvlNumTreeNode)?.height ?? 0;

    const getBalancingFactor = (node: Nullable<TreeNumNode>): number => {
        if (!node) return 0;

        return height(node.right) - height(node.left);
    };

    const recalculateHeight = (node: AvlNumTreeNode) => {
        node.height = 1 + Math.max(height(node?.left), height(node?.right));
    };

    const rotateRight = (
        y: Nullable<TreeNumNode>,
        x: Nullable<TreeNumNode>
    ): AvlNumTreeNode => {
        const t2 = (x as TreeNumNode).right;
        (x as TreeNumNode).right = y;
        (y as TreeNumNode).left = t2;

        // recalculate heights of y & z
        recalculateHeight(x as AvlNumTreeNode);
        recalculateHeight(y as AvlNumTreeNode);

        return x as AvlNumTreeNode;
    };

    const rotateLeft = (
        y: Nullable<TreeNumNode>,
        x: Nullable<TreeNumNode>
    ): AvlNumTreeNode => {
        const t2 = (x as TreeNumNode).left;
        (x as TreeNumNode).left = y;
        (y as TreeNumNode).right = t2;

        // recalculate heights of y & z
        recalculateHeight(x as AvlNumTreeNode);
        recalculateHeight(y as AvlNumTreeNode);

        return x as AvlNumTreeNode;
    };

    // insert into BST
    if (k < root.value) {
        // insert to left node
        root.left = insert(root.left as AvlNumTreeNode, k);
    } else if (k > root.value) {
        root.right = insert(root.right as AvlNumTreeNode, k);
    } else return root; // duplicate node , ignore

    // re-calculate the height of cur node.
    recalculateHeight(root);

    // check if tree is balanced at cur node (i.e root)
    // if not we need to rotate to balance the tree.

    const bf = getBalancingFactor(root);
    if (bf < -1) {
        if (k < (root.left as TreeNumNode).value) {
            // L.L case: all 3 z,y & x nodes are on left subtree.
            // i.e. y is lc of z & x is lc of y
            // rotate right pivot at y
            root = rotateRight(root, root.left);
        } else {
            // L.R case: z,y & x are on left subtree
            // y is lc of z & x is rc of y
            // first rotate y (left-child of z) right  to get all 3 on left subtree
            // rotate left pivot at y.

            root.left = rotateLeft(root.left, root.left?.right);
            root = rotateRight(root, root.left);
        }
    } else if (bf > 1) {
        if (k > (root.right as TreeNumNode).value) {
            // R.R case : z,y & x are  on right subtree.
            // y is rc of z & x is rc of y
            // rotate left pivot at y
            root = rotateLeft(root, root.right);
        } else {
            // R.L case:
            // y is rc of z, x is lc of y
            // first rotate y (rc of z) right to get all 3 on right subtree
            // rotate left with pivot at y.

            root.right = rotateRight(root.right, root.right?.left);
            root = rotateLeft(root, root.right);
        }
    }

    return root;
}

console.log('AVL Tree insert operation');

console.log('insert 10');
let root = insert(null, 10);
printTree(root);

console.log('insert 20');
root = insert(root, 20);
printTree(root);

console.log('insert 30');
root = insert(root, 30);
printTree(root);

root = insert(root, 40);
console.log('insert 40');
printTree(root);

root = insert(root, 50);
console.log('insert 50');
printTree(root);

root = insert(root, 25);
console.log('insert 25');
printTree(root);
