import { AvlNumTreeNode } from '../../../models/avl-tree.models';
import { TreeNumNode, printTree } from '../../../models/tree.models';

function insert(root: Nullable<AvlNumTreeNode>, k: number): AvlNumTreeNode {
    const node = {
        value: k,
        height: 1,
    } as AvlNumTreeNode;

    if (!root) return node;

    const height = (node: Nullable<TreeNumNode>): number =>
        (node as AvlNumTreeNode)?.height ?? 0;

    const getBalancingFactor = (node: Nullable<AvlNumTreeNode>): number => {
        if (!node) return 0;
        return (
            height(node.right as Nullable<AvlNumTreeNode>) -
            height(node.left as Nullable<AvlNumTreeNode>)
        );
    };

    const rotateRight = (
        y: Nullable<TreeNumNode>,
        x: Nullable<TreeNumNode>
    ): AvlNumTreeNode => {
        const t2 = (x as TreeNumNode).right;
        (x as TreeNumNode).right = y;
        (y as TreeNumNode).left = t2;

        (x as AvlNumTreeNode).height =
            1 + Math.max(height(x?.left), height(x?.right));
        (y as AvlNumTreeNode).height =
            1 + Math.max(height(y?.left), height(y?.right));

        return x as AvlNumTreeNode;
    };

    const rotateLeft = (
        y: Nullable<TreeNumNode>,
        x: Nullable<TreeNumNode>
    ): AvlNumTreeNode => {
        const t2 = (x as TreeNumNode).left;
        (x as TreeNumNode).left = y;
        (y as TreeNumNode).right = t2;

        (x as AvlNumTreeNode).height =
            1 + Math.max(height(x?.left), height(x?.right));
        (y as AvlNumTreeNode).height =
            1 + Math.max(height(y?.left), height(y?.right));
        return x as AvlNumTreeNode;
    };

    if (k < root.value) {
        root.left = insert(root.left as Nullable<AvlNumTreeNode>, k);
    } else if (k > root.value) {
        root.right = insert(root.right as Nullable<AvlNumTreeNode>, k);
    } else return root; // duplicate node , ignore insert

    // readjust the height of the current node (i.e root)
    root.height = 1 + Math.max(height(root.left), height(root.right));

    // check if node is balanced if not balance it.

    const bf = getBalancingFactor(root);

    if (bf < -1) {
        if (k < (root.left as AvlNumTreeNode).value) {
            // Left Left case . i.e. left side is taller and z,y & x are all on left subtree.
            // rotate once i.e. rotate right
            root = rotateRight(root, root.left);
        } else {
            // Left Right Case i.e. left side is taller and y is lc of z and x is rc of y
            // rotate left and then rotate right
            root.left = rotateLeft(root.left, root.left?.right);
            root = rotateRight(root, root.left);
        }
    } else if (bf > 1) {
        if (k > (root.right as AvlNumTreeNode).value) {
            // Right Right case, i.e. right subtree is taller z,y & x are on right side
            // y is rc of z , x is rc of y
            // rotate once to left
            root = rotateLeft(root, root.right);
        } else {
            // Right Left case. i.e. right subtree is taller
            // y is rc of z , x is lc of y
            // rotate right & then rotate left
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
