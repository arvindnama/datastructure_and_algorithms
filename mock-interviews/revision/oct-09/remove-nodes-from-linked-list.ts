/**
 * You are given the head of a linked list.

Remove every node which has a node with a greater value anywhere to the right side of it.

Return the head of the modified linked list.


 */

import {
    createList,
    ListNode,
    printList,
} from '../../../models/leet-code.models';

function removeNodes(head: ListNode | null): ListNode | null {
    if (!head) return head;

    const dummy = new ListNode(-1, head);
    let [prev, cur]: [ListNode, ListNode] = [dummy, head];

    while (cur.next) {
        const next = cur.next;
        if (next.val > cur.val) {
            prev.next = cur.next;
            prev = cur.next;
        }
        cur = cur.next;
    }
    return dummy.next;
}

let head = createList([5, 2, 13, 3, 8]);
console.log(printList(removeNodes(head)));

head = createList([1, 1, 1, 1, 1]);
console.log(printList(removeNodes(head)));
