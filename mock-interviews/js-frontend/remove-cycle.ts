/**
 * detect and remove a cycle in linked list
 */

import { createList, ListNode, printList } from '../../models/leet-code.models';

const removeCycle = (head: ListNode | null): ListNode | null => {
    if (!head) return head;

    let start = head;

    do {
        start = start.next as ListNode;
    } while (start && start.next !== head);

    if (!start) return head;
    start.next = null;
    return head;
};

/**
 *   1 -> 2 -> 3 ->1
 *             p   s
 *
 */

let head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = head;

console.log(printList(removeCycle(head)));

head = createList([4, 5, 6]) as ListNode;
console.log(printList(removeCycle(head)));
