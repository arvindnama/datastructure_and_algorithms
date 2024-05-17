import {
    TreeNode,
    createTree,
    printTree,
} from '../../../../models/tree.models';

function postOrderTraversal<T>(root: Nullable<TreeNode<T>>) {
    if (!root) return;

    postOrderTraversal(root.left);
    postOrderTraversal(root.right);
    console.log(root.value);
}

const root = createTree([1, 2, 3, 4, 5, 6, 7]);
printTree(root);
console.log('Post order traversal');
postOrderTraversal(root);
