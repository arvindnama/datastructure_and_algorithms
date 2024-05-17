/**
 * Find Length of a Linked List (Iterative and Recursive)
 * Write a function to count the number of nodes in a given singly linked list
 */

import {
    ListNode,
    createList,
    printList,
} from '../../models/linked-list.models';

function lengthOfListItr<T>(head: Nullable<ListNode<T>>): number {
    let length = 0;
    while (head) {
        head = head.next;
        length++;
    }
    return length;
}

function lengthOfListRec<T>(head: Nullable<ListNode<T>>): number {
    if (!head) return 0;

    return 1 + lengthOfListRec(head.next);
}

// Iterative
console.log('1. Length of list Itr: empty list');
printList(null, lengthOfListItr(null));

let head = createList([1, 2, 3, 4]);
console.log('1. Length of list Itr: full list');
printList(head, lengthOfListItr(head));

// recursive
console.log('2. Length of list Rec: empty list');
printList(null, lengthOfListRec(null));

head = createList([1, 2, 3, 4]);
console.log('2. Length of list Rec: full list');
printList(head, lengthOfListRec(head));

head = createList([1]);
console.log('2. Length of list Rec: full list');
printList(head, lengthOfListRec(head));
