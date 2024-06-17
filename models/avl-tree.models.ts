import { TreeNode } from './tree.models';

export interface AvlTreeNode<T> extends TreeNode<T> {
    height: number;
}

export type AvlNumTreeNode = AvlTreeNode<number>;
