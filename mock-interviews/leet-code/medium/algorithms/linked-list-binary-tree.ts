/**
 * Given a binary tree root and a linked list with head as the first node.

Return True if all the elements in the linked list starting from the head correspond to some downward path connected in the binary tree otherwise return False.

In this context downward path means a path that starts at some node and goes downwards.
 */

import {
    createList,
    createTree,
    ListNode,
    TreeNode,
} from '../../../../models/leet-code.models';

function isSubPath(head: ListNode | null, root: TreeNode | null): boolean {
    /**
     * at any given node of binary tree, check if that node + its children has list
     * if yes , return true,
     * if no , check if left child or right child (as root) have the list.
     *
     * check if list is present for a given node.
     *  --> if am end of head -> I have matached all list element --> return true
     *  --> if root.val !== node.val -> break no point moving further
     *  --> if same check if left sub tree has remaining list or right sub tree has remaining list
     */

    const match = (head: ListNode | null, root: TreeNode | null): boolean => {
        if (!head) return true;
        if (head?.val !== root?.val) return false;
        return match(head?.next, root?.left) || match(head?.next, root?.right);
    };

    if (!root) return false;
    if (match(head, root)) return true;
    return isSubPath(head, root.left) || isSubPath(head, root.right);
}

let root = createTree([1, 4, 4, null, 2, 2, null, null, null, 1, null, 6, 8]);

let head = createList([4, 2, 8]);
console.log(isSubPath(head, root));

root = createTree([1, null, 1, null, null, 10, 1, null, null, null, null, 9]);
head = createList([1, 10]);
console.log(isSubPath(head, root));

root = new TreeNode(2);
root.right = new TreeNode(2);
root.right.right = new TreeNode(2);
root.right.right.right = new TreeNode(1);
head = createList([2, 2, 1]);
console.log(isSubPath(head, root));
