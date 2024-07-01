interface ObjectWithValue {
    valueOf: () => number;
}
type HeapElement = number | string | ObjectWithValue;

interface IHeap {
    insert: (k: HeapElement) => void;
    getTop: () => Nullable<HeapElement>;
    removeTop: () => Nullable<HeapElement>;
    removeAtIdx: (nodeIdx: number) => Nullable<HeapElement>;
    print: () => void;
    getMaxSize: () => number;
    getCurSize: () => number;
    getHeapAsArray: () => Nullable<HeapElement>[];
}

abstract class HeapBase implements IHeap {
    protected array: Array<Nullable<HeapElement>>;
    protected maxSize: number;
    protected heapSize: number = 0;
    protected abstract replacementValue: HeapElement;

    constructor(size: number) {
        this.array = Array(size).fill(-1);
        this.maxSize = size;
    }

    /**
     * Helper methods that will rearrange the heap from bottom up to root
     * to fix the heap properties (max or min)
     */
    protected abstract heapifyBottomUp(nodeIdx: number): void;

    /**
     * Helper methods that will rearrange the heap from a given nodeIdx to leaf
     * and fixes the heap properties
     */
    protected abstract heapifyTopDown(nodeIdx: number): void;

    public getHeapAsArray(): Array<Nullable<HeapElement>> {
        return this.array;
    }

    protected getLeftChildIdx(i: number): number {
        return 2 * i + 1;
    }

    protected getRightChildIdx(i: number): number {
        return 2 * i + 2;
    }

    protected getParentIdx(i: number): number {
        return Math.floor((i - 1) / 2);
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
        this.heapifyBottomUp(this.heapSize - 1);
    }

    public removeTop(): Nullable<HeapElement> {
        const top = this.array[0];

        this.array[0] = this.array[this.heapSize - 1];
        this.array[this.heapSize - 1] = null;
        this.heapSize--;
        this.heapifyTopDown(0);
        return top;
    }

    public removeAtIdx(nodeIdx: number): Nullable<HeapElement> {
        const el = this.array[nodeIdx];
        this.array[nodeIdx] = this.replacementValue;
        this.heapifyBottomUp(nodeIdx);
        this.removeTop();
        return el;
    }

    protected get(idx: number): HeapElement {
        return this.array[idx] as HeapElement;
    }
}

class MinHeap extends HeapBase {
    protected replacementValue: HeapElement = Number.MIN_VALUE;

    protected heapifyBottomUp(nodeIdx: number): void {
        let parentIdx = this.getParentIdx(nodeIdx);

        while (parentIdx >= 0 && this.get(nodeIdx) < this.get(parentIdx)) {
            [this.array[nodeIdx], this.array[parentIdx]] = [
                this.array[parentIdx],
                this.array[nodeIdx],
            ];
            nodeIdx = parentIdx;
            parentIdx = this.getParentIdx(nodeIdx);
        }
    }

    protected heapifyTopDown(nodeIdx: number): void {
        let minIdx = nodeIdx;
        const lcIdx = this.getLeftChildIdx(nodeIdx);
        const rcIdx = this.getRightChildIdx(nodeIdx);

        if (lcIdx < this.heapSize && this.get(lcIdx) < this.get(minIdx)) {
            minIdx = lcIdx;
        }

        if (rcIdx < this.heapSize && this.get(rcIdx) < this.get(minIdx)) {
            minIdx = rcIdx;
        }

        if (minIdx !== nodeIdx) {
            // swap is needed.

            [this.array[minIdx], this.array[nodeIdx]] = [
                this.array[nodeIdx],
                this.array[minIdx],
            ];

            // go down
            this.heapifyTopDown(minIdx);
        }
    }
}

class MaxHeap extends HeapBase {
    protected replacementValue: HeapElement = Number.MAX_SAFE_INTEGER;

    protected heapifyBottomUp(nIdx: number): void {
        let pIdx = this.getParentIdx(nIdx);

        while (pIdx >= 0 && this.get(nIdx) > this.get(pIdx)) {
            [this.array[pIdx], this.array[nIdx]] = [
                this.array[nIdx],
                this.array[pIdx],
            ];

            nIdx = pIdx;
            pIdx = this.getParentIdx(nIdx);
        }
    }

    protected heapifyTopDown(nIdx: number): void {
        let maxIdx = nIdx;
        const lIdx = this.getLeftChildIdx(nIdx);
        const rIdx = this.getRightChildIdx(nIdx);

        if (lIdx < this.heapSize && this.get(lIdx) > this.get(maxIdx)) {
            maxIdx = lIdx;
        }

        if (rIdx < this.heapSize && this.get(rIdx) > this.get(maxIdx)) {
            maxIdx = rIdx;
        }

        if (maxIdx !== nIdx) {
            [this.array[maxIdx], this.array[nIdx]] = [
                this.array[nIdx],
                this.array[maxIdx],
            ];

            this.heapifyTopDown(maxIdx);
        }
    }
}

console.log('***************************');
console.log('Demo max heap functionality');

let heap: IHeap = new MaxHeap(15);
console.log('insert  3', heap.insert(3));
heap.print();
console.log('insert 10', heap.insert(10));
heap.print();
console.log('insert 12', heap.insert(12));
heap.print();
console.log('insert  8', heap.insert(8));
heap.print();
console.log('insert  2', heap.insert(2));
heap.print();
console.log('insert 14', heap.insert(14));
heap.print();

console.log('current size', heap.getCurSize());
console.log('max size', heap.getMaxSize());

console.log('remove at  2', heap.removeAtIdx(2));
console.log('current size', heap.getCurSize());
heap.print();

console.log('insert 15', heap.insert(15));
heap.print();
console.log('insert  5', heap.insert(5));
heap.print();
console.log('current size', heap.getCurSize());
console.log('max size', heap.getMaxSize());

console.log('***************************');
console.log('Demo min heap functionality');
heap = new MinHeap(15);
console.log('insert  3', heap.insert(3));
heap.print();
console.log('insert 10', heap.insert(10));
heap.print();
console.log('insert 12', heap.insert(12));
heap.print();
console.log('insert  8', heap.insert(8));
heap.print();
console.log('insert  2', heap.insert(2));
heap.print();
console.log('insert 14', heap.insert(14));
heap.print();

console.log('current size', heap.getCurSize());
console.log('max size', heap.getMaxSize());

console.log('remove at  2', heap.removeAtIdx(2));
console.log('current size', heap.getCurSize());
heap.print();

console.log('insert 15', heap.insert(15));
heap.print();
console.log('insert  5', heap.insert(5));
heap.print();
console.log('current size', heap.getCurSize());
console.log('max size', heap.getMaxSize());
