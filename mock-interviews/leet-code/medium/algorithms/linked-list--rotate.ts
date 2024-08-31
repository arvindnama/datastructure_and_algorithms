/**
 * Given the head of a linked list, rotate the list to the right by k places.
 */

import {
    createList,
    ListNode,
    printList,
} from '../../../../models/leet-code.models';

function rotateRight(head: ListNode | null, k: number): ListNode | null {
    /**
     * we need to first find the length of the list (n):
     *
     * if k > n , we dont need to do multiple of n rotations as it will result in same head.
     * k = k % n; to eliminate all duplicate rotations
     *
     * prev = null
     * start = head
     * for 1 to k
     * prev = start
     * start = start.next.
     *
     * start will be at new head pos
     * prev.next = null // cut the cord.
     *
     * temp = start
     * temp.next != null
     * temp.next = head;
     * return start
     */

    if (!head) return null;

    let [n, temp] = [0, head];
    while (temp) {
        n++;
        temp = temp.next as ListNode;
    }

    let [prev, start]: [ListNode | null, ListNode] = [null, head];

    k = k % n;
    if (k === 0) return head;
    const headIdx = n - k + 1;
    let i = 1;
    while (i < headIdx) {
        prev = start;
        start = start.next as ListNode;
        i++;
    }
    if (prev) prev.next = null;

    temp = start;
    while (temp.next) {
        temp = temp.next;
    }

    temp.next = head;

    return start;
}

let head = createList([1, 2, 3, 4, 5]);
console.log(printList(rotateRight(head, 2)));

head = createList([0, 1, 2]);
console.log(printList(rotateRight(head, 4)));

head = createList([1]);
console.log(printList(rotateRight(head, 0)));
