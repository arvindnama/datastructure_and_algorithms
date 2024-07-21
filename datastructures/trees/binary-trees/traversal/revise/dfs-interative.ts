import {
    createTree,
    printTree,
    TreeNumNode,
} from '../../../../../models/tree.models';

const inorderTraversal = (root: Nullable<TreeNumNode>): number[] => {
    // left , root, right
    if (!root) return [];

    const res: number[] = [];
    let cur = root;
    const stack: TreeNumNode[] = [];

    while (stack.length || cur) {
        if (cur) {
            stack.push(cur);
            cur = cur.left as TreeNumNode;
        } else {
            cur = stack.pop() as TreeNumNode;
            res.push(cur.value);
            cur = cur.right as TreeNumNode;
        }
    }
    return res;
};

const preorderTraversal = (root: Nullable<TreeNumNode>): number[] => {
    //root, left , right
    if (!root) return [];

    const res: number[] = [];
    const stack: TreeNumNode[] = [root];
    while (stack.length) {
        const cur = stack.pop() as TreeNumNode;
        res.push(cur.value);
        if (cur.right) stack.push(cur.right);
        if (cur.left) stack.push(cur.left);
    }
    return res;
};

const postorderTraversal = (root: Nullable<TreeNumNode>): number[] => {
    // left, right, root
    if (!root) return [];

    const res: number[] = [];
    const stack: TreeNumNode[] = [root];
    while (stack.length) {
        const cur = stack.pop() as TreeNumNode;
        res.unshift(cur.value);
        if (cur.left) stack.push(cur.left);
        if (cur.right) stack.push(cur.right);
    }
    return res;
};

const root = createTree([1, 2, 3, 4, 5, 6, 7]);
printTree(root);

console.log('Inorder Traversal::', inorderTraversal(root));
console.log('PreOrder Traversal::', preorderTraversal(root));
console.log('PostOrder Traversal::', postorderTraversal(root));
