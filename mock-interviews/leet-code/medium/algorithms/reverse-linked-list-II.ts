/**
 * Given the head of a singly linked list and two integers left and right where left <= right, reverse the nodes of the list from position left to position right, and return the reversed list.
 */

import {
    createList,
    ListNode,
    printList,
} from '../../../../models/leet-code.models';

function reverseBetween(
    head: ListNode | null,
    left: number,
    right: number
): ListNode | null {
    /**
     * leftPtr, rightPtr
     * leftPrevPtr, rightNextPtr
     *
     * / 1--> 2--> 3 --> 4 --> 5
     * d lp  l           r     rN
     *
     * add a dummyPtr , dummyPtr -> next = head.
     * lp = dummyPtr
     * l = head
     * r = l->n
     *
     * util  find left , move all 1 to right
     * /-->1--> 2--> 3 --> 4 --> 5
     * d   lp  l,    r
     *
     * /-->1--> 2 --> 3 --> 4 --> 5
     * d   lp   l,rp  r
     * util we find right , everything to right of l start swapping
     * /-->1--> 2 <-- 3 --> 4 --> 5
     * d   lp   l     rp   r
     * /-->1--> 2 <-- 3 <-- 4 --> 5
     * d   lp   l           rp    r
     * lp->n = r
     * l->n = r.next
     * /-->1--> 4 --> 3 --> 2 --> 5
     * d   lp   r           l
     */

    if (!head) return null;

    const dummy = new ListNode();
    dummy.next = head;
    let lPrev = dummy;
    let l = head;
    let r = head.next;
    let counter = 1;
    while (counter < left) {
        lPrev = l as ListNode;
        l = l.next as ListNode;
        r = r?.next as ListNode;
        counter++;
    }
    let rPrev = l;
    while (r && counter < right) {
        const temp = r.next;
        r.next = rPrev;
        rPrev = r;
        r = temp as ListNode;
        counter++;
    }

    /**
     * now patch up other 2 ends
     */
    const rNext = r;
    lPrev.next = rPrev;
    l.next = rNext;

    return dummy.next;
}

let head = createList([1, 2, 3, 4, 5]);
console.log(printList(reverseBetween(head, 2, 4)));
head = createList([5]);
console.log(printList(reverseBetween(head, 1, 1)));

head = createList([1, 2, 3, 4, 5]);
console.log(printList(reverseBetween(head, 1, 2)));
head = createList([1, 2, 3, 4, 5]);
console.log(printList(reverseBetween(head, 1, 5)));
