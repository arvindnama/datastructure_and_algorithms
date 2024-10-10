/**
 * There is a singly-linked list head and we want to delete a node node in it.

You are given the node to be deleted node. You will not be given access to the first node of head.

All the values of the linked list are unique, and it is guaranteed that the given node node is not the last node in the linked list.

Delete the given node. Note that by deleting the node, we do not mean removing it from memory. We mean:

The value of the given node should not exist in the linked list.
The number of nodes in the linked list should decrease by one.
All the values before node should be in the same order.
All the values after node should be in the same order.
Custom testing:

For the input, you should provide the entire linked list head and the node to be given node. node should not be the last node of the list and should be an actual node in the list.
We will build the linked list and pass the node to your function.
The output will be the entire list after calling your function.

 */

import {
    createList,
    ListNode,
    printList,
} from '../../../../models/leet-code.models';

function deleteNode(node: ListNode | null): void {
    /**
     * all we need to do is from cur node to end we keep copying
     * the values from next and replace current/
     * when we reach end we delete it.
     */
    if (!node) return;

    let [prev, cur]: [ListNode | null, ListNode] = [null, node];
    while (cur.next) {
        const next = cur.next;
        cur.val = next.val;
        prev = cur;
        cur = next;
    }

    if (prev) prev.next = null;
}

let head = createList([4, 5, 1, 9])!;
deleteNode(head.next);
console.log(printList(head));

head = createList([4, 5, 1, 9])!;
deleteNode(head.next?.next as ListNode);
console.log(printList(head));
