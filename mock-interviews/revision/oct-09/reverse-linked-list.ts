/**
 *
Given the head of a singly linked list, reverse the list, and return the reversed list.
 */

import {
    createList,
    ListNode,
    printList,
} from '../../../models/leet-code.models';

function reverseList(head: ListNode | null): ListNode | null {
    if (!head) return null;

    const reverse = (prev: ListNode | null, head: ListNode): ListNode => {
        const next = head.next;
        head.next = prev;
        if (!next) return head; // head is the last node.
        prev = head;
        return reverse(prev, next);
    };
    return reverse(null, head);
}

let head = createList([1, 2, 3, 4, 5]);
console.log(printList(reverseList(head)));

head = createList([]);
console.log(printList(reverseList(head)));
