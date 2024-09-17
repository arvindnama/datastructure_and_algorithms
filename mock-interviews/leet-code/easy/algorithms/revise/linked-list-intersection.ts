import { ListNode } from '../../../../../models/leet-code.models';

/**
 * Given the heads of two singly linked-lists headA and headB, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return null.

 */
function getIntersectionNode(
    headA: ListNode,
    headB: ListNode
): ListNode | null {
    /**
     * To find the point of intersection.
     *  pick one of the list (list A) and create a loop.
     *  create 2 pointers
     *  ptr1 at start of list B
     *  ptr2 n step ahead of start B (n being the length of list A)
     *
     * if ptr2 cannot move n steps then there is no loop
     *
     * else start moving ptr1 & ptr2 one step at a time.
     *  they :
     *   1. either meet at point of intersection
     *   2. either of ptr1 or ptr2 will become null that means there is no intersections
     */

    let ptr = headA;
    let n = 1;
    while (ptr.next) {
        ptr = ptr.next;
        n++;
    }
    const endHeadA = ptr;
    ptr.next = headA;

    let [ptr1, ptr2] = [headB, headB];

    while (n > 0) {
        if (!ptr2) return null; // reached end no intersection
        ptr2 = ptr2.next as ListNode;
        n--;
    }

    while (ptr1 !== ptr2) {
        if (!ptr1 || !ptr2) {
            // there is no intersection
            // if there was a loop created ptr2 will never become null
            endHeadA.next = null;
            return null;
        }
        ptr1 = ptr1.next as ListNode;
        ptr2 = ptr2.next as ListNode;
    }

    endHeadA.next = null;

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
