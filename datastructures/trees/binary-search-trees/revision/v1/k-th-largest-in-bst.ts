import {
    TreeNumNode,
    createTree,
    printTree,
} from '../../../../../models/tree.models';

function findKthLargestInBst(root: TreeNumNode, k: number): Nullable<number> {
    if (!root) return null;

    let count = 0;

    const reverseInOrderTraverse = (
        root: Nullable<TreeNumNode>
    ): Nullable<number> => {
        if (!root || count >= k) return;

        const res = reverseInOrderTraverse(root.right);
        if (res) return res;
        count++;
        if (count === k) {
            return root.value;
        }
        return reverseInOrderTraverse(root.left);
    };

    return reverseInOrderTraverse(root);
}
let root = createTree([10, 5]);
printTree(root);
console.log('2nd largest element', findKthLargestInBst(root, 2));

root = createTree([10, 5, 20, null, null, null, 30]) as TreeNumNode;
printTree(root);
console.log('2nd largest element', findKthLargestInBst(root, 2));
