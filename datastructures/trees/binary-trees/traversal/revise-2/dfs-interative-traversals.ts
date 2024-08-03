import {
    createTree,
    printTree,
    TreeNumNode,
} from '../../../../../models/tree.models';

function inorderTraversal(root: TreeNumNode): number[] {
    if (!root) return [];

    const res: number[] = [];
    const stack: Array<TreeNumNode> = [];
    let cur: TreeNumNode = root;

    while (cur || stack.length) {
        if (cur) {
            stack.push(cur);
            cur = cur.left as TreeNumNode;
        } else {
            const n = stack.pop() as TreeNumNode;
            res.push(n.value);
            cur = n.right as TreeNumNode;
        }
    }
    return res;
}

function preorderTraversal(root: TreeNumNode): number[] {
    if (!root) return [];

    const res: number[] = [];
    const stack: TreeNumNode[] = [root];

    while (stack.length) {
        const n = stack.pop() as TreeNumNode;
        res.push(n.value);
        if (n.right) stack.push(n.right);
        if (n.left) stack.push(n.left);
    }

    return res;
}

function postOrderTraversal(root?: TreeNumNode): number[] {
    if (!root) return [];
    const stack: TreeNumNode[] = [root];
    const res: number[] = [];

    while (stack.length) {
        const n = stack.pop() as TreeNumNode;
        res.unshift(n.value);
        if (n.left) stack.push(n.left);
        if (n.right) stack.push(n.right);
    }

    return res;
}

const root = createTree([1, 2, 3, 4, 5, 6, 7]);
printTree(root);

console.log('Inorder Traversal::', inorderTraversal(root));
console.log('Preorder Traversal::', preorderTraversal(root));
console.log('Postorder Traversal::', postOrderTraversal(root));
