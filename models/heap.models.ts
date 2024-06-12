interface IHeap {
    insert: (k: number) => void;
    getTop: () => number;
    removeTop: () => number;
    removeAtIdx: (node: number) => number;
    print: () => void;
    getMaxSize: () => number;
    getCurSize: () => number;
}

abstract class Heap implements IHeap {
    protected maxSize: number;
    protected array: Array<number>;
    protected heapSize: number;
    protected replacementValue: number = -1;

    constructor(size: number) {
        this.maxSize = size;
        this.array = [];
        this.heapSize = 0;
    }
    /**
     * Helper methods that will rearrange the heap from bottom up to root
     * to fix the heap properties (max or min)
     */
    protected abstract heapifyBottomUp(node: number): void;

    /**
     * Helper methods that will rearrange the heap from a given node to leaf
     * and fixes the heap properties
     */
    protected abstract heapifyTopDown(node: number): void;

    protected getParentIdx(node: number): number {
        // if node is event it is right child
        return node % 2 === 0 ? (node - 2) / 2 : (node - 1) / 2;
    }

    protected leftChildIdx(node: number): number {
        return 2 * node + 1;
    }

    protected rightChildIdx(node: number): number {
        return 2 * node + 2;
    }

    public getTop(): number {
        return this.array[0];
    }

    public getCurSize(): number {
        return this.heapSize;
    }

    public getMaxSize(): number {
        return this.maxSize;
    }

    public print() {
        console.log(this.array.slice(0, this.heapSize));
    }

    public insert(k: number) {
        if (this.heapSize >= this.maxSize) {
            throw 'max size reached';
        }

        this.heapSize++;
        this.array[this.heapSize - 1] = k;

        // rearrange from bottom
        this.heapifyBottomUp(this.heapSize - 1);
    }

    public removeTop(): number {
        const top = this.array[0];
        this.array[0] = this.array[this.heapSize - 1];
        // this.array[this.heapSize - 1] = null;

        this.heapSize--;
        this.heapifyTopDown(0);
        return top;
    }

    public removeAtIdx(node: number): number {
        const val = this.array[node];
        this.array[node] = this.replacementValue;
        this.heapifyBottomUp(node);
        this.removeTop();
        return val;
    }
}

export class MaxHeap extends Heap {
    protected replacementValue = Number.MAX_SAFE_INTEGER;

    protected heapifyBottomUp(node: number) {
        let i = node;
        let parentIdx = this.getParentIdx(i);
        while (i != 0 && this.array[node] > this.array[parentIdx]) {
            [this.array[node], this.array[parentIdx]] = [
                this.array[parentIdx],
                this.array[node],
            ];
            i = parentIdx;
            parentIdx = this.getParentIdx(i);
        }
    }

    protected heapifyTopDown(node: number) {
        let max = node;
        const lIdx = this.leftChildIdx(node);
        const rIdx = this.rightChildIdx(node);
        if (lIdx < this.heapSize && this.array[node] < this.array[lIdx]) {
            max = lIdx;
        }
        if (lIdx < this.heapSize && this.array[node] < this.array[rIdx]) {
            max = rIdx;
        }

        if (max !== node) {
            [this.array[max], this.array[node]] = [
                this.array[node],
                this.array[max],
            ];
            this.heapifyTopDown(max);
        }
    }
}

export class MinHeap extends Heap {
    protected replacementValue: number = Number.MIN_VALUE;

    protected heapifyBottomUp(node: number): void {
        let i = node;
        let parentIdx = this.getParentIdx(i);

        while (i != 0 && this.array[i] < this.array[parentIdx]) {
            [this.array[i], this.array[parentIdx]] = [
                this.array[parentIdx],
                this.array[i],
            ];

            i = parentIdx;
            parentIdx = this.getParentIdx(i);
        }
    }

    protected heapifyTopDown(node: number): void {
        let min = node;
        const lIdx = this.leftChildIdx(node);
        const rIdx = this.rightChildIdx(node);

        if (lIdx < this.heapSize && this.array[node] > this.array[lIdx]) {
            min = lIdx;
        }

        if (lIdx < this.heapSize && this.array[node] > this.array[rIdx]) {
            min = rIdx;
        }

        if (min !== node) {
            [this.array[min], this.array[node]] = [
                this.array[node],
                this.array[min],
            ];
            this.heapifyTopDown(min);
        }
    }
}
