/**
 * Given the head of a singly linked list, sort the list using insertion sort, and return the sorted list's head.

The steps of the insertion sort algorithm:

Insertion sort iterates, consuming one input element each repetition and growing a sorted output list.
At each iteration, insertion sort removes one element from the input data, finds the location it belongs within the sorted list and inserts it there.
It repeats until no input elements remain.
 */

import {
    createList,
    ListNode,
    printList,
} from '../../../../models/leet-code.models';

function insertionSortList(head: ListNode | null): ListNode | null {
    if (!head) return null;
    const sortedListHead = new ListNode(1000000);

    const insertIntoSortedList = (node: ListNode) => {
        node.next = null; // break the cord
        if (!sortedListHead.next) {
            sortedListHead.next = node;
            return;
        }
        let [prev, cur] = [sortedListHead, sortedListHead.next];

        while (cur) {
            if (node.val <= cur.val) {
                prev.next = node;
                node.next = cur;
                return;
            }
            prev = cur;
            cur = cur.next as ListNode;
        }
        prev.next = node;
    };

    let temp = head;
    while (temp) {
        const next = temp.next as ListNode;
        insertIntoSortedList(temp);
        temp = next;
    }
    return sortedListHead.next;
}

/**
 * 4, 2, 1, 3
 *          t
 * sortedListHead -> 1->2->4
 *                      p  c
 */
let head = createList([4, 2, 1, 3]);
console.log(printList(insertionSortList(head)));
head = createList([-1, 5, 3, 4, 0]);
console.log(printList(insertionSortList(head)));

head = createList([]);
console.log(printList(insertionSortList(head)));
