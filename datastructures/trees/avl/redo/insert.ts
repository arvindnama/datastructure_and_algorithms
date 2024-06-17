import { AvlNumTreeNode } from '../../../../models/avl-tree.models';
import { TreeNumNode, printTree } from '../../../../models/tree.models';

function insert(root: Nullable<AvlNumTreeNode>, k: number): AvlNumTreeNode {
    const node: AvlNumTreeNode = {
        value: k,
        height: 1,
    };

    if (!root) return node;

    const asAvl = (n: Nullable<TreeNumNode>): AvlNumTreeNode =>
        n as AvlNumTreeNode;

    const height = (n: Nullable<TreeNumNode>): number => asAvl(n)?.height ?? 0;

    const recalculateHeight = (n: Nullable<TreeNumNode>): void => {
        const nAvl = asAvl(n);
        nAvl.height = 1 + Math.max(height(nAvl.left), height(nAvl.right));
    };

    const getBF = (n: Nullable<TreeNumNode>): number => {
        if (!n) return 0;
        // -1 : left tree is tall than right by 1
        // 1 : right tree is tall than left by 1
        // 0 : same hight
        return height(n.right) - height(n.left);
    };

    const leftRotate = (z: Nullable<TreeNumNode>): AvlNumTreeNode => {
        const y = asAvl(z).right;
        const t = asAvl(y).left;
        asAvl(y).left = z;
        asAvl(z).right = t;

        recalculateHeight(y);
        recalculateHeight(z);

        return asAvl(y);
    };

    const rightRotate = (z: Nullable<TreeNumNode>): AvlNumTreeNode => {
        const y = asAvl(z).left;
        const t = asAvl(y).right;

        asAvl(y).right = z;
        asAvl(z).left = t;

        recalculateHeight(y);
        recalculateHeight(z);

        return asAvl(y);
    };

    if (k < root.value) {
        root.left = insert(root.left as AvlNumTreeNode, k);
    } else if (k > root.value) {
        root.right = insert(root.right as AvlNumTreeNode, k);
    } else return root; // duplicate node, ignore

    // re-calculate the height of node.
    recalculateHeight(root);

    const bf = getBF(root);

    if (bf < -1) {
        // Left side of the tree is taller than right by more than 1
        // it is unbalanced, we need to balance it.
        if (k < asAvl(root.left).value) {
            // z,y,x
            // y lc of z & x lc of y all three are skewed to left ,
            // one rotation is needed: Right Rotation root at z
            root = rightRotate(root);
        } else {
            // z,y & x: y is lc of z & x is r.c of y
            // we need two rotations
            // 1st left rotate root at y to get back all 3 in left skewed position
            // 2nd right rotate root at z
            root.left = leftRotate(root.left);
            root = rightRotate(root);
        }
    } else if (bf > 1) {
        // Right side is greater than left side by more than 1
        // it needs to be unbalanced.
        if (k > asAvl(root.right).value) {
            // z,y,x: all are right skewed
            // y is rc of z & x is rc of y
            // Rotate Left with root at z
            root = leftRotate(root);
        } else {
            // z,y,x , y is rc of z and x is lc of y
            // 2 rotations are needed.
            // 1st Right rotate root at Y
            // 2nd Left rotate root at x
            root.right = rightRotate(root.right);
            root = leftRotate(root);
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
