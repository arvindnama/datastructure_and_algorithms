import { TreeNumNode, printTree } from '../../../models/tree.models';

function createBstFromSortedArr(arr: number[]): Nullable<TreeNumNode> {
    const createBst = (s: number, e: number): Nullable<TreeNumNode> => {
        if (s > e) return null;

        const mp = Math.floor((s + e) / 2);

        const root: TreeNumNode = {
            value: arr[mp],
        };

        root.left = createBst(s, mp - 1);
        root.right = createBst(mp + 1, e);

        return root;
    };

    return createBst(0, arr.length - 1);
}

console.log('Create BST from arr', [1, 2, 3]);
printTree(createBstFromSortedArr([1, 2, 3]));

console.log('Create BST from arr', [1, 2, 3, 4]);
printTree(createBstFromSortedArr([1, 2, 3, 4]));
