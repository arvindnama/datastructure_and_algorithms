/**
 * Linked list models & utils
 */
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

/**
 *  Tree models
 */

export class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
    }
}

export const createTreeNode = (val?: number | null): TreeNode | null =>
    val !== undefined && val !== null ? new TreeNode(val) : null;

export function createTree(values: Array<number | null>): TreeNode {
    const root: TreeNode = createTreeNode(values.shift()) as TreeNode;
    const queue = [];
    queue.push(root);
    while (values.length) {
        const nextVal1 = values.shift();
        const nextVal2 = values.shift();
        const node = queue.shift() as TreeNode;
        if (node) {
            node.left = createTreeNode(nextVal1);
            node.right = createTreeNode(nextVal2);
            queue.push(node.left);
            queue.push(node.right);
        }
    }
    return root;
}

export function printTree(root?: Nullable<TreeNode>) {
    const order = [];
    const queue = [root];

    while (queue.length) {
        const node = queue.shift() as TreeNode;
        order.push(node?.val ?? null);
        if (node) {
            queue.push(node.left);
            queue.push(node.right);
        }
    }
    console.log(order);
}

export type JSONObj = { [key: string]: JSONValue };
export type JSONValue =
    | null
    | boolean
    | number
    | string
    | JSONValue[]
    | JSONObj;
export type ArrayType = { id: number } & Record<string, JSONValue>;

export function isJSONObj(obj: JSONValue): obj is JSONObj {
    return typeof obj == 'object';
}

export class N_AryTreeNode {
    val: number;
    children: N_AryTreeNode[];

    constructor(val?: number, children?: N_AryTreeNode[]) {
        this.val = val === undefined ? 0 : val;
        this.children = children === undefined ? [] : children;
    }
}
