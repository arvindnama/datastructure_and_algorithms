/**
 * You are given the head of a singly linked-list. The list can be represented as:

L0 → L1 → … → Ln - 1 → Ln
Reorder the list to be on the following form:

L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …
You may not modify the values in the list's nodes. Only nodes themselves may be changed.
 */

import {
    createList,
    ListNode,
    printList,
} from '../../../../models/leet-code.models';

function reorderList(head: ListNode | null): void {
    /**
     * 1st pass , push all nodes to stack,
     *  last node is at top.
     * also count the nodes (n)
     * create dummy, dummy.next = head;
     * 2nd pass for i=0 to n
     * temp = head;
     * next = temp.next
     * temp.next = stack.pop()
     *
     * repeat till n/2
     * return dummy.next;
     *
     *    0  1  2  3
     *    1, 2, 3, 4       1->4->2
     *    s        e
     *    1, 2, 3, 4       1->4->2->3
     *       s  e
     *
     *    0  1  2  3  4
     *    1, 2, 3, 4, 5       1->5->2
     *    s           e
     *    1, 2, 3, 4, 5       1->5->2->4->3
     *       s     e
     *    1, 2, 3, 4, 5       1->5->2->4->3
     *          se
     */

    if (!head) return;

    const arr = [];
    let n = 0;
    let temp = head;
    while (temp) {
        n++;
        arr.push(temp);
        temp = temp.next as ListNode;
    }

    let [s, e] = [0, n - 1];
    while (s < e) {
        const temp = arr[s].next;
        arr[s].next = arr[e];
        arr[e].next = arr[e] !== temp ? temp : null;
        s++;
        e--;
    }
    arr[s].next = null; // in case of odd sized list , we will need to explicitly nullify start pointer's next node
}

let head = createList([1, 2, 3, 4]);
reorderList(head);
console.log(printList(head));

head = createList([1, 2, 3, 4, 5]);
reorderList(head);
console.log(printList(head));

head = createList([1]);
reorderList(head);
console.log(printList(head));
