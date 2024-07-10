/**
 * You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.
 */

class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}

function mergeTwoLists(
    list1: ListNode | null,
    list2: ListNode | null
): ListNode | null {
    if (!list1) return list2;
    if (!list2) return list1;

    const dummyStartNode = new ListNode();
    let i = dummyStartNode;
    while (list1 && list2) {
        if (list1.val <= list2.val) {
            i.next = list1;
            list1 = list1.next;
        } else {
            i.next = list2;
            list2 = list2.next;
        }
        i = i.next;
    }

    i.next = list1 ? list1 : list2;
    return dummyStartNode.next;
}

mergeTwoLists(null, null);
