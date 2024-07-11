export class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}

export const createList = (arr: number[]): ListNode | null => {
    const dummyHead = new ListNode();
    let ptr = dummyHead;
    for (let i = 0; i < arr.length; i++) {
        ptr.next = new ListNode(arr[i]);
        ptr = ptr.next;
    }
    return dummyHead.next as ListNode;
};

export const printList = (h: ListNode | null): number[] => {
    const res = [];
    while (h) {
        res.push(h.val);
        h = h.next;
    }
    return res;
};
