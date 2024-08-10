import {
    createTree,
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
const getBf = (n: Nullable<TreeNumNode>): number => {
    if (!n) return 0;
    return getHeight(n.right) - getHeight(n.left);
};
const recalculateHeight = (n: AvlNumTreeNode) => {
    if (!n) return 0;
    n.height = 1 + Math.max(getHeight(n.left), getHeight(n.right));
};

const rotateRight = (z: AvlNumTreeNode): AvlNumTreeNode => {
    const y = asAvl(z.left);
    const t2 = asAvl(y.right);

    y.right = z;
    z.left = t2;

    recalculateHeight(z);
    recalculateHeight(y);
    return y;
};

const rotateLeft = (z: AvlNumTreeNode): AvlNumTreeNode => {
    const y = asAvl(z.right);
    const t2 = asAvl(y.left);

    y.left = z;
    z.right = t2;

    recalculateHeight(z);
    recalculateHeight(y);
    return y;
};

function balanceBst(root: Nullable<AvlNumTreeNode>): Nullable<AvlNumTreeNode> {
    if (!root) return root;
    root.left = balanceBst(asAvl(root.left));
    root.right = balanceBst(asAvl(root.right));

    recalculateHeight(root);

    const bf = getBf(root);

    if (bf < -1) {
        const [z, y] = [root, asAvl(root.left)];
        if (getBf(y) <= 0) {
            // x = y.left
            // 1 rotation at z => rotateRight
            root = rotateRight(z);
        } else {
            // x = y.right
            // 2 rotation
            // 2st at y => left
            // 2nd at z => rotateRight
            root.left = rotateLeft(y);
            root = rotateRight(z);
        }
    } else if (bf > 1) {
        const [z, y] = [root, asAvl(root.right)];

        if (getBf(y) >= 1) {
            // x is y.right
            root = rotateLeft(z);
        } else {
            // x is y.left
            root.right = rotateRight(y);
            root = rotateLeft(z);
        }
    }
    return root;
}

console.log('****** Balance Logic II ********');
let root = createTree([30, 20, null, 10]) as Nullable<TreeNumNode>;
printTree(root);
root = balanceBst(asAvl(root));
console.log('Balanced Tree');
printTree(root);

root = createTree([
    4,
    3,
    null,
    2,
    null,
    null,
    null,
    1,
]) as Nullable<TreeNumNode>;
printTree(root);
root = balanceBst(asAvl(root));
console.log('Balanced Tree');
printTree(root);

root = createTree([
    4,
    3,
    5,
    2,
    null,
    null,
    6,
    1,
    null,
    null,
    null,
    null,
    null,
    null,
    7,
]) as Nullable<TreeNumNode>;
printTree(root);
root = balanceBst(asAvl(root));
console.log('Balanced Tree');
printTree(root);
