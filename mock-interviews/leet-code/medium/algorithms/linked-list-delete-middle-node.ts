/**
 * You are given the head of a linked list. Delete the middle node, and return the head of the modified linked list.

The middle node of a linked list of size n is the ⌊n / 2⌋th node from the start using 0-based indexing, where ⌊x⌋ denotes the largest integer less than or equal to x.

For n = 1, 2, 3, 4, and 5, the middle nodes are 0, 1, 1, 2, and 2, respectively.
 */

import {
    createList,
    ListNode,
    printList,
} from '../../../../models/leet-code.models';

function deleteMiddle(head: ListNode | null): ListNode | null {
    /**
     * slow pointer & fast pointer
     *  move slow pointer by 1 step and fast pointer by 2
     * when fast pointer reaches end , slow pointer is at mid
     * have another pts that is behind slow.
     */
    if (!head) return null;

    const dummy = new ListNode();
    dummy.next = head;
    let [slow, fast, prev] = [head, head, dummy];
    while (fast?.next) {
        prev = slow;
        fast = fast.next?.next as ListNode;
        slow = slow.next as ListNode;
    }
    prev.next = slow.next;
    return dummy.next;
}

let head = createList([1, 3, 4, 7, 1, 2, 6]);
console.log(printList(deleteMiddle(head)));

head = createList([1, 2, 3, 4]);
console.log(printList(deleteMiddle(head)));

head = createList([2, 1]);
console.log(printList(deleteMiddle(head)));

head = createList([1]);
console.log(printList(deleteMiddle(head)));
