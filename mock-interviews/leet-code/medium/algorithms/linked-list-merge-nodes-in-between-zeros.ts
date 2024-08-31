/**
 * You are given the head of a linked list, which contains a series of integers separated by 0's. The beginning and end of the linked list will have Node.val == 0.

For every two consecutive 0's, merge all the nodes lying in between them into a single node whose value is the sum of all the merged nodes. The modified list should not contain any 0's.

Return the head of the modified linked list.
 */

import {
    createList,
    ListNode,
    printList,
} from '../../../../models/leet-code.models';

function mergeNodes(head: ListNode | null): ListNode | null {
    /**
     * 0, 3, 1, 0, 4, 5, 2, 0
     * s        c
     * headStart -> 4
     * 0, 3, 1, 0, 4, 5, 2, 0
     *          s,          c
     * headStart -> 4 -> 11
     *              head
     */

    if (!head) return null;

    const res = new ListNode();
    let cur = res;
    const insertIntoRes = (sum: number) => {
        const node = new ListNode(sum);
        cur.next = node;
        cur = cur.next;
    };

    let start = head.next; // we know list starts with zero , so jump;
    let sum = 0;
    while (start) {
        sum += start.val;
        if (start.val === 0) {
            insertIntoRes(sum);
            sum = 0;
        }
        start = start.next;
    }

    return res.next;
}

let head = createList([0, 3, 1, 0, 4, 5, 2, 0]);
console.log(printList(mergeNodes(head)));

head = createList([0, 1, 0, 3, 0, 2, 2, 0]);
console.log(printList(mergeNodes(head)));

head = createList([0, 1, 0]);
console.log(printList(mergeNodes(head)));
head = createList([0]);
console.log(printList(mergeNodes(head)));
