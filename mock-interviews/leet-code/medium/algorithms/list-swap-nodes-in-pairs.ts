/**
 * Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)


 */

import {
    createList,
    ListNode,
    printList,
} from '../../../../models/leet-code.models';

function swapPairs(head: ListNode | null): ListNode | null {
    if (!head || !head.next) return head;

    const dummy = new ListNode();
    let [f, s, prev] = [head, head.next, dummy];
    dummy.next = f;

    while (f && s) {
        const temp = s.next as ListNode;
        s.next = f;
        f.next = temp;
        prev.next = s;
        prev = f;
        f = temp; // or prev.next
        s = f?.next as ListNode;
    }

    return dummy.next;
}

let head = createList([1, 2, 3, 4]);
console.log(printList(head));
head = swapPairs(head);
console.log(printList(head));

head = createList([1, 2, 3, 4, 5]);
console.log(printList(head));
head = swapPairs(head);
console.log(printList(head));

head = createList([1, 2, 3]);
console.log(printList(head));
head = swapPairs(head);
console.log(printList(head));

head = createList([1]);
console.log(printList(head));
head = swapPairs(head);
console.log(printList(head));
