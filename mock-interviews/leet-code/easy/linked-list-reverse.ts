// Given the head of a singly linked list, reverse the list, and return the reversed list.

import {
    ListNode,
    createList,
    printList,
} from '../../../models/leet-code.models';

function reverseList(head: ListNode | null): ListNode | null {
    if (!head) return head;

    let [prev, cur]: [ListNode | null, ListNode | null] = [null, head];
    while (cur) {
        const temp = cur.next as ListNode;
        cur.next = prev;
        prev = cur;
        cur = temp;
    }

    return prev;
}

let head = createList([1, 2, 3, 4, 5]);
console.log(printList(reverseList(head)));

head = createList([1, 2]);
console.log(printList(reverseList(head)));

head = createList([]);
console.log(printList(reverseList(head)));

function reverseListRecursive(head: ListNode | null): ListNode | null {
    if (!head) return head;

    const recurse = (
        prev: ListNode | null,
        head: ListNode | null
    ): ListNode | null => {
        if (!head) return prev;
        const temp = head.next;
        head.next = prev;
        prev = head;
        head = temp;
        return recurse(prev, head);
    };

    return recurse(null, head);
}

head = createList([1, 2, 3, 4, 5]);
console.log(printList(reverseListRecursive(head)));

head = createList([1, 2]);
console.log(printList(reverseListRecursive(head)));

head = createList([]);
console.log(printList(reverseListRecursive(head)));
