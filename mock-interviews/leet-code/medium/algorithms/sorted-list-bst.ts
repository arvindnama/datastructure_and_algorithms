/**
 * Given the head of a singly linked list where elements are sorted in ascending order, convert it to a
height-balanced
 binary search tree.
 */

import {
    createList,
    ListNode,
    printTree,
    TreeNode,
} from '../../../../models/leet-code.models';

function sortedListToBST(head: ListNode | null): TreeNode | null {
    /**
     * find the mid of linked list make it the root
     * root.left = listToBst(head)
     * root.right = listToBst(mid.next)
     * return root;
     */

    const findMid = (head: ListNode): ListNode => {
        const dummy = new ListNode(-1, head);
        let [prev, slow, fast] = [dummy, head, head];
        while (fast?.next) {
            prev = slow as ListNode;
            slow = slow.next as ListNode;
            fast = fast.next?.next as ListNode;
        }
        prev.next = null;
        return slow;
    };

    if (!head) return null;
    if (!head.next) {
        return new TreeNode(head.val);
    }

    const mid = findMid(head);
    console.log(mid?.val);
    const root = new TreeNode(mid.val);
    root.left = sortedListToBST(head);
    root.right = sortedListToBST(mid.next);
    return root;
}

const head = createList([-10, -3, 0, 5, 9]);
console.log(printTree(sortedListToBST(head)));
