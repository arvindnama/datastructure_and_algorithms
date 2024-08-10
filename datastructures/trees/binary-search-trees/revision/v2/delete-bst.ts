import {
    createTree,
    printTree,
    TreeNumNode,
} from '../../../../../models/tree.models';

const deleteFromBst = (
    root: Nullable<TreeNumNode>,
    value: number
): Nullable<TreeNumNode> => {
    if (!root) return null;

    const inorderSucess = (node: TreeNumNode): TreeNumNode => {
        let temp = node.right as TreeNumNode;
        while (temp.left) {
            temp = temp.left;
        }
        return temp;
    };

    if (root.value > value) {
        root.left = deleteFromBst(root.left, value);
    } else if (root.value < value) {
        root.right = deleteFromBst(root.right, value);
    } else {
        // found node to delete
        if (!root.left && !root.right) root = null;
        else if (!root.left) root = root.right;
        else if (!root.right) root = root.left;
        else {
            // both child are present;
            // find inorder successor of root
            // replace root with IOS and delete IOS from root.right

            const ios = inorderSucess(root);
            root.value = ios.value;
            root.right = deleteFromBst(root.right, ios.value);
        }
    }
    return root;
};

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
