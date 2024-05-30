import {
    NullableNumListNode,
    NumListNode,
    createList,
    printList,
} from '../../../models/linked-list.models';

function reverseListRec(head: NullableNumListNode): NullableNumListNode {
    const reverseInt = (
        head: NullableNumListNode,
        prev: NullableNumListNode
    ): NullableNumListNode => {
        if (!head) return null;
        if (!head.next) {
            head.next = prev;
            return head;
        }
        const temp = head.next;
        head.next = prev;
        prev = head;
        head = temp;
        return reverseInt(head, prev) as NumListNode;
    };
    return reverseInt(head, null);
}

console.log('1. Reverse list Iterative - multiple entries');
const head = createList([1, 2, 3, 4, 5, 6, 7, 8]);
printList(head);
printList(reverseListRec(head));
