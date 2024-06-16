import {
    TreeNumNode,
    createTree,
    printTree,
} from '../../../models/tree.models';

function insert(root: TreeNumNode, k: number): TreeNumNode {
    const node: TreeNumNode = {
        value: k,
    };
    if (!root) {
        return node;
    }

    if (k <= root.value) {
        if (!root.left) {
            root.left = node;
        } else {
            insert(root.left, k);
        }
    } else {
        if (!root.right) {
            root.right = node;
        } else {
            insert(root.right, k);
        }
    }
    return root;
}

const root = createTree([10, 9, 11, 7]);

insert(root, 5);

printTree(root);
