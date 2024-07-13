/**
 * Given the head of a linked list and an integer val, remove all the nodes of the linked list that has Node.val == val, and return the new head.


 */

import { createList, ListNode, printList } from '../../models/leet-code.models';

function removeElements(head: ListNode | null, val: number): ListNode | null {
    if (!head) return head;

    const dummyHead = new ListNode(-1);
    dummyHead.next = head;
    let [prev, cur]: [ListNode, ListNode | null] = [dummyHead, dummyHead.next];
    while (cur) {
        if (cur.val === val) {
            prev.next = cur.next;
        } else {
            prev = cur;
        }
        cur = cur.next;
    }

    return dummyHead.next;
}

let head = createList([6, 1, 2, 6, 3, 4, 5, 6]);
console.log(printList(removeElements(head, 6)));

head = createList([7, 7, 7, 7]);
console.log(printList(removeElements(head, 7)));
