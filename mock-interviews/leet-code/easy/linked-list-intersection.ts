import { ListNode } from '../../../models/leet-code.models';

/**
 * Given the heads of two singly linked-lists headA and headB, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return null.

 */
function getIntersectionNode(
    headA: ListNode,
    headB: ListNode
): ListNode | null {
    /**
     * pick one list (A) and create a loop
     * on second list (B)  set two pointers
     *   1. head
     *   2. n nodes away from head ( n === length of list A)
     *
     * move both pointers one step at a time .
     * if they meet then that is the point of intersection
     * if they never meet there is no intersection .
     *
     * reverse the temporary loop create at the beginning
     */

    let [tempA, tempB, countA] = [headA, headB, 1];

    const breakLoop = () => (tempA.next = null);
    const createLoop = () => (tempA.next = headA);

    while (tempA.next) {
        tempA = tempA.next;
        countA++;
    }

    createLoop();

    while (tempB && countA) {
        tempB = tempB.next as ListNode;
        countA--;
    }

    while (headB !== tempB) {
        if (!headB || !tempB) {
            // reaches end i.e. no loop and hence no intersection.
            breakLoop();
            return null;
        }
        headB = headB.next as ListNode;
        tempB = tempB.next as ListNode;
    }

    breakLoop();
    return headB;
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
