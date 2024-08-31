/**
 * Given the head of a singly linked list, group all the nodes with odd indices together followed by the nodes with even indices, and return the reordered list.

The first node is considered odd, and the second node is even, and so on.

Note that the relative order inside both the even and odd groups should remain as it was in the input.

You must solve the problem in O(1) extra space complexity and O(n) time complexity.


 */

import {
    createList,
    ListNode,
    printList,
} from '../../../../models/leet-code.models';

function oddEvenList(head: ListNode | null): ListNode | null {
    if (!head) return null;

    const [oddHead, evenHead] = [new ListNode(), new ListNode()];
    let [odd, even] = [oddHead, evenHead];
    let temp = head;

    let i = 1;
    while (temp) {
        const next = temp.next as ListNode;
        if (i % 2 == 0) {
            even.next = temp;
            even = temp;
        } else {
            odd.next = temp;
            odd = temp;
        }
        i++;
        temp.next = null; // break the link
        temp = next;
    }
    odd.next = evenHead.next;
    return oddHead.next;
}

// 1 2 3 4 5
//          t
// oddHead -> 1 -> 3 -> 5
//                      odd
// evenHead-> 2 -> 4
//                 even
// odd.next = evenHead.next
// oddHead -> 1 -> 3 -> 5 -> 2 -> 4
// oddHead.next : 1 -> 3 -> 5 -> 2 -> 4

let head = createList([1, 2, 3, 4, 5]);
console.log(printList(oddEvenList(head)));

// 1
// t
// oddHead -> 1
//            odd
// evenHead->null
// odd.next = evenHead.next
// oddHead -> 1
// oddHead.next : 1
head = createList([1]);
console.log(printList(oddEvenList(head)));

// 1 2
// t
// oddHead -> 1
//            odd
// evenHead->2
//           e
// odd.next = evenHead.next 1->2
// oddHead -> 1 -> 2
// oddHead.next : 1 -> 2

head = createList([1, 2]);
console.log(printList(oddEvenList(head)));
