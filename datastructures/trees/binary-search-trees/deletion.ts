import {
    TreeNumNode,
    createTree,
    printTree,
} from '../../../models/tree.models';

function deleteFromTree(root: TreeNumNode, k: number) {
    const findNode = (
        parent: Nullable<TreeNumNode>,
        root: Nullable<TreeNumNode>
    ): [Nullable<TreeNumNode>, Nullable<TreeNumNode>] => {
        if (!root) return [parent, null];
        if (root.value === k) return [parent, root];

        return k < root.value
            ? findNode(root, root.left)
            : findNode(root, root.right);
    };

    const isLeaf = (r: TreeNumNode) => !r.left && !r.right;

    const deleteNode = (parent: TreeNumNode, node: TreeNumNode) => {
        if (isLeaf(node)) {
            if (node.value === parent.left?.value) {
                parent.left = null;
            } else {
                parent.right = null;
            }
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
deleteFromTree(root, 20);
console.log('Delete 20 from tree');
printTree(root);

root = createTree([50, 30, 70, 20, 40, null, 80]) as TreeNumNode;
printTree(root);
deleteFromTree(root, 70);
console.log('Delete 20 from tree');
printTree(root);

root = createTree([50, 30, 70, 20, 40, 60, 80]) as TreeNumNode;
printTree(root);
deleteFromTree(root, 70);
console.log('Delete 70 from tree');
printTree(root);

root = createTree([50, 30, 70, 20, 40, 60, 80]) as TreeNumNode;
printTree(root);
deleteFromTree(root, 50);
console.log('Delete 50 from tree');
printTree(root);
