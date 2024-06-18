import {
    TreeNumNode,
    createTree,
    printTree,
} from '../../../../models/tree.models';

function deleteFromBst(root: TreeNumNode, k: number): void {
    const findNode = (
        parent: Nullable<TreeNumNode>,
        node: Nullable<TreeNumNode>
    ): [Nullable<TreeNumNode>, Nullable<TreeNumNode>] => {
        if (!node) return [parent, null];

        if (k === node.value) return [parent, node];
        if (k < node.value) return findNode(node, node.left);
        return findNode(node, node.right);
    };

    const deleteNode = (parent: TreeNumNode, node: TreeNumNode) => {
        if (!node.left && !node.right) {
            if (parent.left?.value === node.value) {
                // parent's left child is node , hence nullify parent's left child
                parent.left = null;
            } else {
                parent.right = null;
            }
            return;
        }

        if (node.left) {
            node.value = node.left.value;
            deleteNode(node, node.left);
        } else if (node.right) {
            node.value = node.right.value;
            deleteNode(node, node.right);
        }
    };

    const [parent, node] = findNode(null, root);
    if (node) {
        deleteNode(parent as TreeNumNode, node);
    }
}

let root = createTree([50, 30, 70, 20, 40, 60, 80]);
printTree(root);
console.log('Delete 20 from tree');
deleteFromBst(root, 20);
printTree(root);

root = createTree([50, 30, 70, 20, 40, null, 80]) as TreeNumNode;
printTree(root);
console.log('Delete 70 from tree');
deleteFromBst(root, 70);
printTree(root);

root = createTree([50, 30, 70, 20, 40, 60, 80]) as TreeNumNode;
printTree(root);
console.log('Delete 50 from tree');
deleteFromBst(root, 50);
printTree(root);
