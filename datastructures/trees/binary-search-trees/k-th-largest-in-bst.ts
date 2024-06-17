import {
    TreeNumNode,
    createTree,
    printTree,
} from '../../../models/tree.models';

/**
 * To find the kth largest element in a BST .
 *  InOrder of BSF gives sorted array.
 *  Reversing InOrder traversal give sorted array (desc) order
 *  Logic is to traverse reverse inOrder.
 *  i.e. right , root, left
 *  keep a counter and increment every time you access root and when counter reaches k
 * we have the kth largest element
 */
function findKthLargestInBst(root: TreeNumNode, k: number): number {
    let c = 0;
    const traverseReverseInOrder = (root: Nullable<TreeNumNode>) => {
        if (!root || c >= k) return;

        traverseReverseInOrder(root.right);
        c++;

        if (c === k) {
            console.log(root.value);
            return root.value;
        }
        traverseReverseInOrder(root.left);
    };

    return traverseReverseInOrder(root) as number;
}

let root = createTree([10, 5]);
printTree(root);
console.log('2nd largest element', findKthLargestInBst(root, 2));

root = createTree([10, 5, 20, null, null, null, 30]) as TreeNumNode;
printTree(root);
console.log('2nd largest element', findKthLargestInBst(root, 2));
