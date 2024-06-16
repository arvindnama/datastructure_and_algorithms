import {
    TreeNumNode,
    createTree,
    printTree,
} from '../../../models/tree.models';

function balanceBST(root: Nullable<TreeNumNode>): Nullable<TreeNumNode> {
    if (!root) return null;

    const inOrderTraverse = (
        root: Nullable<TreeNumNode>,
        sortedArray: number[]
    ) => {
        if (!root) return;
        if (!root.left && !root.right) {
            sortedArray.push(root.value);
            return;
        }
        inOrderTraverse(root.left, sortedArray);
        sortedArray.push(root.value);
        inOrderTraverse(root.right, sortedArray);
    };

    const createBST = (
        arr: number[],
        start: number,
        end: number
    ): Nullable<TreeNumNode> => {
        if (start > end) return null;
        const midPoint = Math.floor((start + end) / 2);
        const root: TreeNumNode = {
            value: arr[midPoint],
        };

        root.left = createBST(arr, start, midPoint - 1);
        root.right = createBST(arr, midPoint + 1, end);
        return root;
    };

    const sortedArray: number[] = [];
    inOrderTraverse(root, sortedArray);
    return createBST(sortedArray, 0, sortedArray.length - 1);
}

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
