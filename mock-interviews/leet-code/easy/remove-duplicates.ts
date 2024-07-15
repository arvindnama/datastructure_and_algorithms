/**
 * Given the head of a sorted linked list, delete all duplicates such that each element appears only once. Return the linked list sorted as well.


 */

import {
    ListNode,
    createList,
    printList,
} from '../../../models/leet-code.models';

function deleteDuplicates(head: ListNode | null): ListNode | null {
    if (!head) return null;

    let ptr: ListNode | null = head;
    while (ptr) {
        const next = ptr.next;
        if (ptr.val === next?.val) {
            ptr.next = next.next;
        } else {
            ptr = ptr.next;
        }
    }

    return head;
}

let head = createList([1, 1, 2]);
head = deleteDuplicates(head);
console.log(printList(head));

head = createList([1, 1, 2, 3, 3]);
head = deleteDuplicates(head);
console.log(printList(head));

head = createList([1, 1, 1, 1, 1, 1]);
head = deleteDuplicates(head);
console.log(printList(head));
