/**
 * Given the head of a linked list, remove the nth node from the end of the list and return its head.
 */

import {
    ListNode,
    createList,
    printList,
} from '../../../../models/leet-code.models';

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    if (!head) return head;

    const dummy: ListNode = new ListNode();
    dummy.next = head;
    let [prev, start, nth]: [ListNode, ListNode, ListNode] = [
        dummy,
        head,
        head,
    ];

    while (n > 1) {
        nth = nth.next as ListNode;
        n--;
    }

    while (nth.next) {
        nth = nth.next;
        prev = start;
        start = start.next as ListNode;
    }

    if (prev) prev.next = start.next;
    return dummy.next;
}

let head = createList([1, 2, 3, 4, 5]);
console.log(printList(head));
head = removeNthFromEnd(head, 2);
console.log('remove 2nd from last', printList(head));

head = createList([1, 2, 3, 4, 5]);
head = removeNthFromEnd(head, 5);
console.log('remove 5th from last', printList(head));

head = createList([1, 2, 3, 4, 5]);
head = removeNthFromEnd(head, 1);
console.log('remove 1st from last', printList(head));

head = createList([1]);
head = removeNthFromEnd(head, 1);
console.log('remove 1st from last', printList(head));
