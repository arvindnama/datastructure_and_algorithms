/**
 * Balance and BST
 */
import {
    TreeNumNode,
    createTree,
    printTree,
} from '../../../../../models/tree.models';

function balanceBST(root: Nullable<TreeNumNode>): Nullable<TreeNumNode> {
    const inorder = (root: Nullable<TreeNumNode>, arr: number[]) => {
        if (!root) return;
        inorder(root.left, arr);
        arr.push(root.value);
        inorder(root.right, arr);
    };

    const constructBst = (
        arr: number[],
        s: number,
        e: number
    ): Nullable<TreeNumNode> => {
        if (s > e) return null;
        if (s === e) return { value: arr[s] };

        const m = Math.floor((s + e) / 2);
        const root = { value: arr[m] } as TreeNumNode;
        root.left = constructBst(arr, s, m - 1);
        root.right = constructBst(arr, m + 1, e);
        return root;
    };
    const arr: number[] = [];
    inorder(root, arr);
    return constructBst(arr, 0, arr.length - 1);
}

console.log('****** Balance Logic I ********');
let root = createTree([30, 20, null, 10]) as Nullable<TreeNumNode>;
printTree(root);
root = balanceBST(root);
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
root = balanceBST(root);
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
root = balanceBST(root);
console.log('Balanced Tree');
printTree(root);
