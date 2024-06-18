import {
    TreeNumNode,
    createTree,
    printTree,
} from '../../../models/tree.models';

/**
 * This Methods performs a delete operation on Binary search tree
 * and ensure that all BST properties are maintained after the delete operation.
 * i.e.
 * 1. node  is > left child nodes , n < right child nodes
 * Logic ::
 *
 * there can be 3 cases for deleting a node.
 * the node that needs to be delete can fall under following 4 categories
 *
 * 1. node to be deleted is a leaf node
 *    In this scenario, just mark the node for deletion i.e. replace self with null
 * 2. node to be deleted has only left child
 *    In this scenario, replace self with right child
 * 3. node to be deleted has only right child
 *     In this scenario, replace self with left child
 * 4. node to be deleted has both children.
 *      In this case we will need to find the inOrderSuccessor of the node
 *      replace current node with its InOrder successor
 *      delete InOrder successor from right subtree.
 *
 *      NOTE: InOrder successor of a node is the node with minimum value in the right subtree

 * @param root BST root node
 * @param k  node with value to be deleted
 * @returns BST root node after delete operation
 */
function deleteFromBst(
    root: Nullable<TreeNumNode>,
    k: number
): Nullable<TreeNumNode> {
    if (!root) return null;

    const getInOrderSuccessor = (root: TreeNumNode): TreeNumNode => {
        // InOrder successor is the node with minimum value in the right subtree.
        let node: TreeNumNode = root.right as TreeNumNode;
        while (node?.left) {
            node = node.left;
        }
        return node;
    };

    if (k < root.value) {
        root.left = deleteFromBst(root.left, k);
    } else if (k > root.value) {
        root.right = deleteFromBst(root.right, k);
    } else {
        // we need to delete this node.
        if (!root.left && !root.right) return null; // leaf node so just delete self

        if (!root.left) return root.right; // 1 child - right child, replace self with right child

        if (!root.right) return root.left; // 1 child - left child, replace self with left child.

        // node has both children
        // get in InOrder successor the node
        // replace current node with InOrder successor
        // remove InOrder successor.
        const inOrderSuccessor = getInOrderSuccessor(root);
        root.value = inOrderSuccessor.value;
        // delete InOrder successor node.
        root.right = deleteFromBst(root.right, inOrderSuccessor.value);
    }
    return root;
}

let root = createTree([50, 30, 70, 20, 40, 60, 80]) as Nullable<TreeNumNode>;
printTree(root);
console.log('Delete 20 from tree');
root = deleteFromBst(root, 20);
printTree(root);

console.log('Delete 30 from tree');
root = deleteFromBst(root, 30);
printTree(root);

console.log('Delete 70 from tree');
root = deleteFromBst(root, 70);
printTree(root);

console.log('Delete 50 from tree');
root = deleteFromBst(root, 50);
printTree(root);
