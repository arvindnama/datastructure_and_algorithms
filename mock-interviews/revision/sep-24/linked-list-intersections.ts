import { ListNode } from '../../../models/leet-code.models';

/**
 * Given the heads of two singly linked-lists headA and headB, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return null.

 */
function getIntersectionNode(
    headA: ListNode,
    headB: ListNode
): ListNode | null {
    /**
     * pick one of the list (headA) , create a circle
     *
     * if there is an intersection,  if we start traversing on other list (headB)
     * we should loop as well.
     *
     * To find the intersection :
     *  have 2 prts , start = headB and ptr which is n steps away from headB
     *  n being the length of list A
     *
     * move both one by one , they meet at intersection or end up null
     *
     */

    let [ptr, n] = [headA, 1];
    const breakLoop = () => (ptr.next = null);

    while (ptr.next) {
        ptr = ptr.next!;
        n++;
    }
    ptr.next = headA; // loop created.

    let [ptr1, ptr2] = [headB, headB];
    for (let i = 0; i < n && ptr2; i++) {
        ptr2 = ptr2.next!;
    }

    if (!ptr2) {
        breakLoop();
        return null; // headB is smaller than headA and there is no loop/intersection
    }

    while (ptr1?.val !== ptr2?.val) {
        ptr1 = ptr1.next!;
        ptr2 = ptr2.next!;
    }

    breakLoop();
    if (!ptr1 || !ptr2) return null; // did not meet fell off
    return ptr1;
}

let headC = new ListNode(8);
headC.next = new ListNode(4);
headC.next.next = new ListNode(5);

let headA = new ListNode(4);
headA.next = new ListNode(1);
headA.next.next = headC;

let headB = new ListNode(5);
headB.next = new ListNode(6);
headB.next.next = new ListNode(1);
headB.next.next.next = headC;

console.log(getIntersectionNode(headA, headB)?.val);

headC = new ListNode(2);
headC.next = new ListNode(4);

headA = new ListNode(1);
headA.next = new ListNode(9);
headA.next.next = new ListNode(1);
headA.next.next.next = headC;

headB = new ListNode(3);
headB.next = headC;

console.log(getIntersectionNode(headA, headB)?.val);

headA = new ListNode(2);
headA.next = new ListNode(6);
headA.next.next = new ListNode(4);

headB = new ListNode(1);
headB.next = new ListNode(2);

console.log(getIntersectionNode(headA, headB)?.val ?? null);
