/**
 * You are given two linked lists: list1 and list2 of sizes n and m respectively.

Remove list1's nodes from the ath node to the bth node, and put list2 in their place.

The blue edges and nodes in the following figure indicate the result:
 */

import {
    createList,
    ListNode,
    printList,
} from '../../../../models/leet-code.models';

function mergeInBetween(
    list1: ListNode | null,
    a: number,
    b: number,
    list2: ListNode | null
): ListNode | null {
    if (!list1) return null;

    let list2End = list2;
    while (list2End?.next) {
        list2End = list2End.next;
    }

    let [aPrevNode, aNode] = [new ListNode(), list1];
    let i = 1;
    while (i <= a) {
        aPrevNode = aNode;
        aNode = aNode.next as ListNode;
        i++;
    }
    let bNode = aNode;
    while (i <= b) {
        bNode = bNode.next as ListNode;
        i++;
    }

    const bNextNode = bNode.next;

    aPrevNode.next = list2;
    if (list2End) {
        list2End.next = bNextNode;
    }

    return list1;
}

let l1 = createList([10, 1, 13, 6, 9, 5]);
let l2 = createList([10000000, 1000001, 1000002]);

console.log(printList(mergeInBetween(l1, 3, 4, l2)));

l1 = createList([0, 1, 2, 3, 4, 5, 6]);
l2 = createList([1000000, 1000001, 1000002, 1000003, 1000004]);

console.log(printList(mergeInBetween(l1, 2, 5, l2)));
