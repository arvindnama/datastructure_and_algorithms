// Given the head of a singly linked list, reverse the list, and return the reversed list.

import {
    ListNode,
    createList,
    printList,
} from '../../../models/leet-code.models';

function reverseList(head: ListNode | null): ListNode | null {
    /*
       1  2  3  4  5
    */

    if (!head) return null;
    const reverse = (cur: ListNode, prev: ListNode | null): ListNode | null => {
        if (!cur.next) {
            cur.next = prev;
            return cur;
        }
        const head = reverse(cur.next, cur);
        cur.next = prev;
        return head;
    };

    return reverse(head, null);
}

let head = createList([1, 2, 3, 4, 5]);
console.log(printList(reverseList(head)));

head = createList([1, 2]);
console.log(printList(reverseList(head)));

head = createList([]);
console.log(printList(reverseList(head)));

function reverseListIterative(head: ListNode | null): ListNode | null {
    if (!head) return null;
    let [prev, cur]: [ListNode | null, ListNode] = [null, head];

    while (cur.next) {
        const next = cur.next;
        cur.next = prev;
        prev = cur;
        cur = next;
    }
    cur.next = prev;
    return cur;
}

head = createList([1, 2, 3, 4, 5]);
console.log(printList(reverseListIterative(head)));

head = createList([1, 2]);
console.log(printList(reverseListIterative(head)));

head = createList([]);
console.log(printList(reverseListIterative(head)));

/*
    <-1<-2<-3<-4<-5
      p c  n
*/
