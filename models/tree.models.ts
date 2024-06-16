export interface TreeNode<T> {
    value: T;
    left?: Nullable<TreeNode<T>>;
    right?: Nullable<TreeNode<T>>;
}

export type TreeNumNode = TreeNode<number>;

export const createTreeNode = <T>(value?: T): Nullable<TreeNode<T>> =>
    value !== undefined && value !== null ? { value } : null;

export function createTree<T>(values: T[]): TreeNode<T> {
    const root: TreeNode<T> = createTreeNode(values.shift()) as TreeNode<T>;
    const queue = [];
    queue.push(root);
    while (values.length) {
        const nextVal1 = values.shift();
        const nextVal2 = values.shift();
        const node = queue.shift() as TreeNode<T>;
        if (node) {
            node.left = createTreeNode(nextVal1);
            node.right = createTreeNode(nextVal2);
            queue.push(node.left);
            queue.push(node.right);
        }
    }
    return root;
}

export function printTree<T>(root?: Nullable<TreeNode<T>>) {
    const order = [];
    const queue = [root];

    while (queue.length) {
        const node = queue.shift() as TreeNode<T>;
        order.push(node?.value ?? null);
        if (node) {
            queue.push(node.left);
            queue.push(node.right);
        }
    }
    console.log(order);
}
