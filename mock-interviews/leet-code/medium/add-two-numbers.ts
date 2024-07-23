/**
 * You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself
 */

import {
    createList,
    ListNode,
    printList,
} from '../../../models/leet-code.models';

function addTwoNumbers(
    l1: ListNode | null,
    l2: ListNode | null
): ListNode | null {
    const res = new ListNode();
    let ptr = res;
    let carry = 0;

    while (l1 || l2) {
        const [v1, v2] = [l1?.val ?? 0, l2?.val ?? 0];

        let val = carry + v1 + v2;
        carry = Math.floor(val / 10);
        val = val % 10;

        ptr.next = new ListNode(val);
        l1 = l1?.next as ListNode;
        l2 = l2?.next as ListNode;
        ptr = ptr.next;
    }

    if (carry) ptr.next = new ListNode(carry);

    return res.next;
}

let [l1, l2] = [createList([2, 4, 3]), createList([5, 6, 4])];
console.log(printList(addTwoNumbers(l1, l2)));

[l1, l2] = [createList([0]), createList([0])];
console.log(printList(addTwoNumbers(l1, l2)));

[l1, l2] = [createList([9, 9, 9, 9, 9, 9, 9]), createList([9, 9, 9, 9])];
console.log(printList(addTwoNumbers(l1, l2)));
