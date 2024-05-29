import {
    DoublyListNode,
    createDoublyLinkedList,
    printDoublyLinkedList,
} from '../../../models/linked-list.models';

function deleteNode(
    head: DoublyListNode<number>,
    val: number
): DoublyListNode<number> {
    let node: Nullable<DoublyListNode<number>> = head;

    while (node) {
        if (node.value === val) {
            const prevNode = node.prev;
            const nextNode = node.next;
            if (prevNode) {
                prevNode.next = node.next;
            } else {
                // start node;
                head = nextNode as DoublyListNode<number>;
            }
            if (nextNode) {
                nextNode.prev = prevNode;
            }
            break;
        }
        node = node.next;
    }

    return head;
}

let head = createDoublyLinkedList([2, 45, 3, 1]);
printDoublyLinkedList(head);
console.log('delete node 45');
printDoublyLinkedList(deleteNode(head, 45));

head = createDoublyLinkedList([2, 45, 3, 1]);
printDoublyLinkedList(head);
console.log('delete node 1');
printDoublyLinkedList(deleteNode(head, 1));

head = createDoublyLinkedList([2, 45, 3, 1]);
printDoublyLinkedList(head);
console.log('delete node 2');
printDoublyLinkedList(deleteNode(head, 2));
