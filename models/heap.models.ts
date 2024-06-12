interface ObjectWithValue {
    valueOf: () => number;
}
type HeapElement = number | string | ObjectWithValue;

interface IHeap {
    insert: (k: HeapElement) => void;
    getTop: () => Nullable<HeapElement>;
    removeTop: () => Nullable<HeapElement>;
    removeAtIdx: (nodeIdx: number) => Nullable<HeapElement>;
    heapify: (nodeIdx: number) => void;
    print: () => void;
    getMaxSize: () => number;
    getCurSize: () => number;
    getHeapAsArray: () => Nullable<HeapElement>[];
}

abstract class Heap implements IHeap {
    protected maxSize: number;
    protected array: Array<Nullable<HeapElement>>;
    protected heapSize: number;
    protected abstract replacementValue: HeapElement;

    constructor(size: number) {
        this.maxSize = size;
        this.array = [];
        this.heapSize = 0;
    }
    /**
     * Helper methods that will rearrange the heap from bottom up to root
     * to fix the heap properties (max or min)
     */
    protected abstract fixPositionOfKeyAt(nodeIdx: number): void;

    /**
     * Helper methods that will rearrange the heap from a given nodeIdx to leaf
     * and fixes the heap properties
     */
    public abstract heapify(nodeIdx: number): void;

    protected getParentIdx(nodeIdx: number): number {
        return Math.floor((nodeIdx - 1) / 2);
    }

    protected leftChildIdx(nodeIdx: number): number {
        return 2 * nodeIdx + 1;
    }

    protected rightChildIdx(nodeIdx: number): number {
        return 2 * nodeIdx + 2;
    }

    protected getEl(nodeIdx: number): HeapElement {
        return this.array[nodeIdx] as HeapElement;
    }

    public getHeapAsArray(): Array<Nullable<HeapElement>> {
        return this.array;
    }

    public getTop(): Nullable<HeapElement> {
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

    public insert(k: HeapElement) {
        if (this.heapSize >= this.maxSize) {
            throw 'max size reached';
        }

        this.heapSize++;
        this.array[this.heapSize - 1] = k;

        // rearrange from bottom
        this.fixPositionOfKeyAt(this.heapSize - 1);
    }

    public removeTop(): Nullable<HeapElement> {
        if (this.heapSize === 0) return null;
        const top = this.array[0];
        this.array[0] = this.array[this.heapSize - 1];
        this.array[this.heapSize - 1] = undefined;

        this.heapSize--;
        this.heapify(0);
        return top;
    }

    public removeAtIdx(nodeIdx: number): Nullable<HeapElement> {
        const val = this.array[nodeIdx];
        this.array[nodeIdx] = this.replacementValue;
        this.fixPositionOfKeyAt(nodeIdx);
        this.removeTop();
        return val;
    }
}

export class MaxHeap extends Heap {
    protected replacementValue: HeapElement = Number.MAX_SAFE_INTEGER;

    protected fixPositionOfKeyAt(nodeIdx: number) {
        let i = nodeIdx;
        let parentIdx = this.getParentIdx(i);
        while (i != 0 && this.getEl(i) >= this.getEl(parentIdx)) {
            [this.array[i], this.array[parentIdx]] = [
                this.array[parentIdx],
                this.array[i],
            ];
            i = parentIdx;
            parentIdx = this.getParentIdx(i);
        }
    }

    public heapify(nodeIdx: number) {
        let max = nodeIdx;
        const lIdx = this.leftChildIdx(nodeIdx);
        const rIdx = this.rightChildIdx(nodeIdx);
        if (lIdx < this.heapSize && this.getEl(nodeIdx) < this.getEl(lIdx)) {
            max = lIdx;
        }
        if (lIdx < this.heapSize && this.getEl(max) < this.getEl(rIdx)) {
            max = rIdx;
        }

        if (max !== nodeIdx) {
            [this.array[max], this.array[nodeIdx]] = [
                this.array[nodeIdx],
                this.array[max],
            ];
            this.heapify(max);
        }
    }
}

export class MinHeap extends Heap {
    protected replacementValue: HeapElement = Number.MIN_VALUE;

    protected fixPositionOfKeyAt(nodeIdx: number): void {
        let i = nodeIdx;
        let parentIdx = this.getParentIdx(i);

        while (i != 0 && this.getEl(i) <= this.getEl(parentIdx)) {
            [this.array[i], this.array[parentIdx]] = [
                this.array[parentIdx],
                this.array[i],
            ];

            i = parentIdx;
            parentIdx = this.getParentIdx(i);
        }
    }

    public heapify(nodeIdx: number): void {
        let min = nodeIdx;
        const lIdx = this.leftChildIdx(nodeIdx);
        const rIdx = this.rightChildIdx(nodeIdx);

        if (lIdx < this.heapSize && this.getEl(nodeIdx) > this.getEl(lIdx)) {
            min = lIdx;
        }

        if (lIdx < this.heapSize && this.getEl(min) > this.getEl(rIdx)) {
            min = rIdx;
        }

        if (min !== nodeIdx) {
            [this.array[min], this.array[nodeIdx]] = [
                this.array[nodeIdx],
                this.array[min],
            ];
            this.heapify(min);
        }
    }
}
