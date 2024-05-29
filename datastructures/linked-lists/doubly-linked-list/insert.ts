import {
    DoublyListNode,
    createDoublyLinkedList,
    printDoublyLinkedList,
} from '../../../models/linked-list.models';

function insertAtBeginning(
    head: Nullable<DoublyListNode<number>>,
    val: number
): DoublyListNode<number> {
    const node: DoublyListNode<number> = {
        value: val,
    };
    if (!head) return node;

    node.next = head;
    head.prev = node;
    return node;
}

function insertAtEnd(
    head: Nullable<DoublyListNode<number>>,
    val: number
): DoublyListNode<number> {
    const node: DoublyListNode<number> = {
        value: val,
    };
    if (!head) return node;

    let temp = head;
    while (temp.next) {
        temp = temp.next;
    }

    temp.next = node;
    node.prev = temp;
    return head;
}

function insertAfterVal(
    head: Nullable<DoublyListNode<number>>,
    val: number,
    newData: number
): DoublyListNode<number> {
    const node: DoublyListNode<number> = {
        value: newData,
    };
    if (!head) return node;

    let temp: Nullable<DoublyListNode<number>> = head;
    while (temp) {
        if (temp.value === val) {
            const t = temp.next;
            temp.next = node;
            node.prev = temp;
            if (t) {
                node.next = t;
                t.prev = node;
            }
            break;
        }
        temp = temp.next;
    }
    return head;
}

function insertBeforeVal(
    head: Nullable<DoublyListNode<number>>,
    val: number,
    newData: number
): DoublyListNode<number> {
    const node: DoublyListNode<number> = {
        value: newData,
    };
    if (!head) return node;

    let temp: Nullable<DoublyListNode<number>> = head;
    while (temp) {
        if (temp.value === val) {
            const t = temp.prev;
            if (t) {
                t.next = node;
            } else {
                // insert at beginning
                head = node;
            }
            node.next = temp;
            node.prev = t;
            break;
        }
        temp = temp.next;
    }
    return head;
}

let head;
console.log('Insert 10 At beginning');
printDoublyLinkedList(head);
printDoublyLinkedList(insertAtBeginning(head, 10));

head = createDoublyLinkedList([1, 2, 3, 4, 5]);
console.log('Insert 10 At beginning');
printDoublyLinkedList(head);
printDoublyLinkedList(insertAtBeginning(head, 10));

console.log('Insert 10 At end');
printDoublyLinkedList(undefined);
printDoublyLinkedList(insertAtEnd(undefined, 10));

head = createDoublyLinkedList([1, 2, 3, 4, 5]);
console.log('Insert 10 At end');
printDoublyLinkedList(head);
printDoublyLinkedList(insertAtEnd(head, 10));

head = createDoublyLinkedList([1, 2, 3, 4, 5]);
console.log('Insert 10 After 2');
printDoublyLinkedList(head);
printDoublyLinkedList(insertAfterVal(head, 2, 10));

head = createDoublyLinkedList([1, 2, 3, 4, 5]);
console.log('Insert 10 Before 2');
printDoublyLinkedList(head);
printDoublyLinkedList(insertBeforeVal(head, 2, 10));

head = createDoublyLinkedList([1, 2, 3, 4, 5]);
console.log('Insert 10 Before 1');
printDoublyLinkedList(head);
printDoublyLinkedList(insertBeforeVal(head, 1, 10));
