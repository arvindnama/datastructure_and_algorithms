import {
    NullableNumDoublyListNode,
    createDoublyLinkedList,
    printDoublyLinkedList,
} from '../../../models/linked-list.models';

function reverseDoublyLinkedListRec(
    head: NullableNumDoublyListNode
): NullableNumDoublyListNode {
    if (!head) return head;

    if (!head.next) {
        head.next = head.prev;
        head.prev = undefined;
        return head;
    }

    const nxt = head.next;
    head.next = head.prev;
    head.prev = nxt;
    return reverseDoublyLinkedListRec(nxt);
}

const head = createDoublyLinkedList([1, 2, 3, 4]);
printDoublyLinkedList(head);
console.log('Reverse doubly linked list recursive');
printDoublyLinkedList(reverseDoublyLinkedListRec(head));
