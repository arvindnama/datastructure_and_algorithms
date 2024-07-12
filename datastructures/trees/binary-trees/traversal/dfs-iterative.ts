import {
    createTree,
    printTree,
    TreeNumNode,
} from '../../../../models/tree.models';

const inorderTraversal = (root: Nullable<TreeNumNode>): number[] => {
    if (!root) return [];

    let cur: Nullable<TreeNumNode> = root;
    const stack: TreeNumNode[] = [];
    const res: number[] = [];
    while (stack.length || cur) {
        if (cur) {
            stack.push(cur);
            cur = cur.left;
        } else {
            const n = stack.pop() as TreeNumNode;
            res.push(n.value);
            cur = n.right;
        }
    }
    return res;
};

const preorderTraversal = (root: Nullable<TreeNumNode>): number[] => {
    if (!root) return [];
    const stack: TreeNumNode[] = [root];
    const res: number[] = [];
    while (stack.length) {
        const n = stack.pop() as TreeNumNode;
        res.push(n.value);
        if (n.right) stack.push(n.right);
        if (n.left) stack.push(n.left);
    }

    return res;
};

const postorderTraversal = (root: Nullable<TreeNumNode>): number[] => {
    if (!root) return [];
    const stack: TreeNumNode[] = [root];
    const res: number[] = [];
    while (stack.length) {
        const n = stack.pop() as TreeNumNode;
        res.push(n.value);
        if (n.left) stack.push(n.left);
        if (n.right) stack.push(n.right);
    }
    return res.reverse();
};
const root = createTree([1, 2, 3, 4, 5, 6, 7]);
printTree(root);

console.log('Inorder Traversal::', inorderTraversal(root));
console.log('PreOrder Traversal::', preorderTraversal(root));
console.log('PostOrder Traversal::', postorderTraversal(root));
