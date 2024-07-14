import {
    NumListNode,
    createNumListNode,
} from '../../../models/linked-list.models';

/**
 * Given the heads of two singly linked-lists headA and headB, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return null.

 */
function getIntersectionNode(
    headA: NumListNode,
    headB: NumListNode
): Nullable<NumListNode> {
    /**
     * pick one of the list (A), track its length & create a temp loop
     * set 2 pointers on other list (B)
     *  1. start of list
     *  2. another which is n steps away from start (n == length of A)
     *
     * move both pointer till one , which will result in 2 possibilities
     *  1. both pointer meet at intersection OR
     *  2. either of the pointer results in null (no loop and no intersection)
     */

    let [tempA, tempB, countA] = [headA, headB, 1];
    const createLoop = () => (tempA.next = headA);
    const removeLoop = () => (tempA.next = null);

    while (tempA.next) {
        tempA = tempA.next as NumListNode;
        countA++;
    }

    createLoop();
    while (countA && tempB) {
        tempB = tempB.next as NumListNode;
        countA--;
    }

    while (headB !== tempB) {
        if (!tempB || !headB) {
            removeLoop();
            return null;
        }
        headB = headB.next as NumListNode;
        tempB = tempB.next as NumListNode;
    }
    removeLoop();
    return headB;
}

let headC = createNumListNode(8);
headC.next = createNumListNode(4);
headC.next.next = createNumListNode(5);

let headA = createNumListNode(4);
headA.next = createNumListNode(1);
headA.next.next = headC;

let headB = createNumListNode(5);
headB.next = createNumListNode(6);
headB.next.next = createNumListNode(1);
headB.next.next.next = headC;

console.log(getIntersectionNode(headA, headB)?.value);

headC = createNumListNode(2);
headC.next = createNumListNode(4);

headA = createNumListNode(1);
headA.next = createNumListNode(9);
headA.next.next = createNumListNode(1);
headA.next.next.next = headC;

headB = createNumListNode(3);
headB.next = headC;

console.log(getIntersectionNode(headA, headB)?.value);

headA = createNumListNode(2);
headA.next = createNumListNode(6);
headA.next.next = createNumListNode(4);

headB = createNumListNode(1);
headB.next = createNumListNode(2);

console.log(getIntersectionNode(headA, headB)?.value ?? null);
