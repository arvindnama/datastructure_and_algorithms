/**
 * Given head, the head of a linked list, determine if the linked list has a cycle in it.
 */

import { ListNode, createList } from '../../../models/leet-code.models';

function hasCycle(head: ListNode | null): boolean {
    if (!head) return false;

    let [slowPtr, fastPtr] = [head, head];
    do {
        slowPtr = slowPtr.next as ListNode;
        fastPtr = fastPtr.next?.next as ListNode;
    } while (slowPtr !== fastPtr && fastPtr);

    return !!fastPtr;
}

let head = createList([3, 2, 0, 4]);
console.log(hasCycle(head));

head = createList([3]);
console.log(hasCycle(head));

head = new ListNode(3);
head.next = new ListNode(2);
head.next.next = new ListNode(0);
head.next.next.next = new ListNode(4);
head.next.next.next.next = head;
console.log(hasCycle(head));

head = new ListNode(3);
head.next = new ListNode(2);
head.next.next = head;
console.log(hasCycle(head));
