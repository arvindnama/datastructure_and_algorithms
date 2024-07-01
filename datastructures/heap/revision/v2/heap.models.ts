import {
    HeapElement,
    IHeap,
    HeapElementComparator,
} from '../../../../models/heap.models';

const DefaultComparator: HeapElementComparator = (
    a1: HeapElement,
    a2: HeapElement
): number => {
    if (typeof a1 === 'string' && typeof a2 === 'string') {
        return a1 > a2 ? +1 : a1 < a2 ? -1 : 0;
    } else if (typeof a1 === 'number' && typeof a2 === 'number') {
        return a1 - a2;
    } else {
        return +a1.valueOf() - +a2.valueOf();
    }
};
abstract class AbstractHeap implements IHeap {
    #maxSize: number = -1;
    #currSize: number = 0;

    protected heapContainer: Array<Nullable<HeapElement>> = [];
    protected comparator: HeapElementComparator;
    protected abstract replacementValue: HeapElement;
    protected abstract fixElementAtPos(nodeIdx: number): void;
    public abstract heapify(nodeIdx: number): void;

    constructor(
        private size: number,
        private heapComparator: HeapElementComparator = DefaultComparator
    ) {
        this.#maxSize = size;
        this.comparator = heapComparator;
    }

    public getTop(): Nullable<HeapElement> {
        return this.heapContainer[0];
    }

    public getMaxSize(): number {
        return this.#maxSize;
    }

    public getCurSize(): number {
        return this.#currSize;
    }

    public getHeapAsArray(): Nullable<HeapElement>[] {
        return this.heapContainer;
    }

    public print(): void {
        console.log(this.heapContainer.slice(0, this.#currSize));
    }

    protected getVal(nIdx: number): HeapElement {
        return this.heapContainer[nIdx] as HeapElement;
    }

    protected leftChildIdx(nIdx: number): number {
        return 2 * nIdx + 1;
    }

    protected rightChildIdx(nIdx: number): number {
        return 2 * nIdx + 2;
    }

    protected parentIdx(nIdx: number): number {
        return Math.floor((nIdx - 1) / 2);
    }

    public insert(k: HeapElement): void {
        // insert at the leaf and then fix the position by traversing up the tree.

        if (this.#currSize + 1 > this.#maxSize) {
            throw 'max size reached';
        }
        this.#currSize++;
        this.heapContainer[this.#currSize - 1] = k;
        this.fixElementAtPos(this.#currSize - 1);
    }

    public removeTop(): Nullable<HeapElement> {
        // replace the least element in the heap container with top and heapify the tree from top
        const top = this.heapContainer[0];

        this.heapContainer[0] = this.heapContainer[this.#currSize - 1];
        this.heapContainer[this.#currSize - 1] = undefined;
        this.#currSize--;

        this.heapify(0);
        return top;
    }
    public removeAtIdx(nodeIdx: number): Nullable<HeapElement> {
        // step-1 replace the element at nodeIdx with `replacement value`
        // step-2 fix the position of the element so it move to top of the heap
        // step-3 remove top.

        const val = this.heapContainer[nodeIdx];
        this.heapContainer[nodeIdx] = this.replacementValue;
        this.fixElementAtPos(nodeIdx);
        this.removeTop();
        return val;
    }
}

export class MinHeap extends AbstractHeap {
    protected replacementValue: HeapElement = Number.MIN_VALUE;

    protected fixElementAtPos(nodeIdx: number): void {
        let parentIdx = this.parentIdx(nodeIdx);
        while (
            nodeIdx != 0 &&
            this.comparator(this.getVal(nodeIdx), this.getVal(parentIdx)) <= 0
        ) {
            [this.heapContainer[parentIdx], this.heapContainer[nodeIdx]] = [
                this.heapContainer[nodeIdx],
                this.heapContainer[parentIdx],
            ];
            nodeIdx = parentIdx;
            parentIdx = this.parentIdx(nodeIdx);
        }
    }

    public heapify(nodeIdx: number): void {
        let minIdx = nodeIdx;
        const leftChildIdx = this.leftChildIdx(nodeIdx);
        const rightChildIdx = this.rightChildIdx(nodeIdx);
        if (
            leftChildIdx < this.getCurSize() &&
            this.comparator(this.getVal(minIdx), this.getVal(leftChildIdx)) > 0
        ) {
            minIdx = leftChildIdx;
        }

        if (
            rightChildIdx < this.getCurSize() &&
            this.comparator(this.getVal(minIdx), this.getVal(rightChildIdx)) > 0
        ) {
            minIdx = rightChildIdx;
        }

        if (minIdx !== nodeIdx) {
            [this.heapContainer[nodeIdx], this.heapContainer[minIdx]] = [
                this.heapContainer[minIdx],
                this.heapContainer[nodeIdx],
            ];

            this.heapify(minIdx);
        }
    }
}

export class MaxHeap extends AbstractHeap {
    protected replacementValue: HeapElement = Number.MAX_SAFE_INTEGER;

    protected fixElementAtPos(nodeIdx: number): void {
        let parentIdx = this.parentIdx(nodeIdx);

        while (
            nodeIdx != 0 &&
            this.comparator(this.getVal(nodeIdx), this.getVal(parentIdx)) >= 0
        ) {
            [this.heapContainer[nodeIdx], this.heapContainer[parentIdx]] = [
                this.heapContainer[parentIdx],
                this.heapContainer[nodeIdx],
            ];
            nodeIdx = parentIdx;
            parentIdx = this.parentIdx(nodeIdx);
        }
    }

    public heapify(nodeIdx: number): void {
        let maxIdx = nodeIdx;
        const lIdx = this.leftChildIdx(nodeIdx);
        const rIdx = this.rightChildIdx(nodeIdx);

        if (
            lIdx < this.getCurSize() &&
            this.comparator(this.getVal(lIdx), maxIdx) > 0
        ) {
            maxIdx = lIdx;
        }

        if (
            rIdx < this.getCurSize() &&
            this.comparator(this.getVal(rIdx), maxIdx) > 0
        ) {
            maxIdx = rIdx;
        }

        if (maxIdx !== nodeIdx) {
            [this.heapContainer[nodeIdx], this.heapContainer[maxIdx]] = [
                this.heapContainer[maxIdx],
                this.heapContainer[nodeIdx],
            ];

            this.heapify(maxIdx);
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
