export interface ListNode<T> {
    value: T;
    next?: Nullable<ListNode<T>>;
}

export type NullableNumListNode = Nullable<ListNode<number>>;
export type NumListNode = ListNode<number>;

export function createList<T>(
    values: T[],
    allowCircular = false
): Nullable<ListNode<T>> {
    if (!values?.length) {
        return null;
    }
    const first: ListNode<T> = { value: values[0] };
    const store: ListNode<T>[] = [first];
    let nodePtr = first;
    for (let i = 1; i < values.length; i++) {
        let node;
        if (allowCircular) {
            node = store.find((n) => n.value === values[i]);
        }
        node = node || {
            value: values[i],
        };

        store.push(node);
        nodePtr.next = node;
        nodePtr = node;
    }

    return first;
}

export function printList<T>(
    node: Nullable<ListNode<T>>,
    allowCircular = false
) {
    let ptr = node;
    const visited: Array<ListNode<T>> = [];
    const values: T[] = [];
    while (ptr) {
        values.push(ptr.value);
        if (allowCircular && visited.find((v) => v.value === ptr?.value)) {
            // circle , exit.
            break;
        }
        visited.push(ptr);
        ptr = ptr.next;
    }
    console.log(values.join('->'));
}

export interface DoublyListNode<T> {
    value: T;
    next?: DoublyListNode<T>;
    prev?: DoublyListNode<T>;
}

export function createDoublyLinkedList<T>(values: T[]): DoublyListNode<T> {
    const head: DoublyListNode<T> = {
        value: values[0],
        prev: undefined,
    };

    for (let i = 1, node = head; i < values.length; i++) {
        node.next = {
            value: values[i],
            prev: node,
        };
        node = node.next;
    }

    return head;
}

export function printDoublyLinkedList<T>(head?: DoublyListNode<T>) {
    let node: Nullable<DoublyListNode<T>> = head;
    const values: T[] = [];
    while (node) {
        values.push(node.value);
        node = node.next;
    }
    console.log('Doubly linked list', values.join('<=>'));
}
