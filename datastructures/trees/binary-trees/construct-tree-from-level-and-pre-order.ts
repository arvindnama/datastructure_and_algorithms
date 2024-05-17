/**
 * Given inorder and level-order traversals of a Binary Tree, construct the Binary Tree. Following
 * is an example to illustrate the problem
 *
 *  in[]    = {4, 8, 10, 12, 14, 20, 22};
 *  level[] = {20, 8, 22, 4, 12, 10, 14};
 *
 * level order always starts with root .
 * preorder -> all nodes to left of root is left sub-tree & to right is right subtree.
 *
 * 1. root = level[0]
 * 2. get left subtree
 *    inOrderLeft     ---> all element to left of root
 *    levelOrderLeft  ---> levelOrder.filter(inOrderLeftSubtree)
 * 3. get right subtree
 *    inOrderRight     ---> all element to right of root
 *    levelOrderRight  ---> levelOrder.filter(inOrderRightSubtree)
 *
 * root.left = recursive Construct(inOrderLeft, levelOrderLeft)
 * root.right = recursive Construct(inOrderRight, levelOrderRight)
 * repeat until level Or inorder array is empty.
 *
 */

import {
    TreeNode,
    createTreeNode,
    printTree,
} from '../../../models/tree.models';

function constructTree<T>(inO: T[], levO: T[]): Nullable<TreeNode<T>> {
    if (!levO.length) return null;

    const rootVal = levO[0];
    const rootIdx = inO.findIndex((v) => v === rootVal);

    const leftIn = inO.slice(0, rootIdx);
    const leftLev = levO.filter((v) => leftIn.find((a) => a === v));

    const rightIn = inO.slice(rootIdx + 1);
    const rightLev = levO.filter((v) => rightIn.find((a) => a === v));

    const root = createTreeNode(rootVal) as TreeNode<T>;
    root.left = constructTree(leftIn, leftLev);
    root.right = constructTree(rightIn, rightLev);

    return root;
}

console.log('construct tree from level & pre order list');
printTree(
    constructTree([4, 8, 10, 12, 14, 20, 22], [20, 8, 22, 4, 12, 10, 14])
);
