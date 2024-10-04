/**
 * detect and remove a cycle in linked list
 */

import {
    createList,
    ListNode,
    printList,
} from '../../../models/leet-code.models';

const removeCycle = (head: ListNode | null): ListNode | null => {
    if (!head) return null;

    let start = head;

    // in a cycle last node will point to head.
    // navigate up to a point where start.next == head;

    while (start && start.next !== head) {
        start = start.next as ListNode;
    }
    if (start) start.next = null;
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
