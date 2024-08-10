import { HeapElement, IHeap } from '../../../../models/heap.models';

abstract class AbstractHeap implements IHeap {
    protected heap: Array<HeapElement> = [];
    protected replacementValue!: HeapElement;

    constructor(private size: number) {}

    protected parent(n: number): number {
        return Math.floor((n - 1) / 2);
    }

    protected leftChild(n: number): number {
        return 2 * n + 1;
    }

    protected rightChild(n: number): number {
        return 2 * n + 2;
    }

    public print() {
        console.log(this.heap.join(','));
    }
    public getHeapAsArray(): Nullable<HeapElement>[] {
        return this.heap;
    }
    public getMaxSize(): number {
        return this.size;
    }
    public getCurSize(): number {
        return this.heap.length;
    }

    public getTop(): Nullable<HeapElement> {
        return this.heap[0];
    }

    public insert(k: HeapElement) {
        this.heap.push(k);
        this.fixPosition(this.heap.length - 1);
    }

    public removeTop(): Nullable<HeapElement> {
        if (!this.heap.length) return null;
        const top = this.heap[0];
        this.heap[0] = this.heap[this.heap.length - 1];
        this.heap.length--;
        this.heapify(0);
        return top;
    }

    public removeAtIdx(nodeIdx: number): Nullable<HeapElement> {
        const node = this.heap[nodeIdx];
        this.heap[nodeIdx] = this.replacementValue;
        this.fixPosition(nodeIdx);
        this.removeTop();
        return node;
    }

    public abstract heapify(nodeIdx: number): void;
    public abstract fixPosition(nodeIdx: number): void;
}

class MinHeap extends AbstractHeap {
    protected replacementValue: HeapElement = Number.MIN_SAFE_INTEGER;

    public heapify(nodeIdx: number): void {
        let temp = nodeIdx;
        const left = this.leftChild(nodeIdx);
        const right = this.rightChild(nodeIdx);
        const size = this.heap.length;
        if (left < size && this.heap[temp] > this.heap[left]) temp = left;
        if (right < size && this.heap[temp] > this.heap[right]) temp = right;
        if (temp !== nodeIdx) {
            [this.heap[temp], this.heap[nodeIdx]] = [
                this.heap[nodeIdx],
                this.heap[temp],
            ];
            nodeIdx = temp;
            this.heapify(nodeIdx);
        }
    }

    public fixPosition(nodeIdx: number): void {
        const parent = this.parent(nodeIdx);
        if (parent >= 0 && this.heap[parent] > this.heap[nodeIdx]) {
            [this.heap[parent], this.heap[nodeIdx]] = [
                this.heap[nodeIdx],
                this.heap[parent],
            ];
            this.fixPosition(parent);
        }
    }
}

class MaxHeap extends AbstractHeap {
    protected replacementValue: HeapElement = Number.MAX_SAFE_INTEGER;

    public heapify(nodeIdx: number): void {
        let temp = nodeIdx;

        const [size, left, right] = [
            this.heap.length,
            this.leftChild(nodeIdx),
            this.rightChild(nodeIdx),
        ];

        if (left < size && this.heap[left] > this.heap[temp]) temp = left;
        if (right < size && this.heap[right] > this.heap[temp]) temp = right;

        if (temp !== nodeIdx) {
            [this.heap[temp], this.heap[nodeIdx]] = [
                this.heap[nodeIdx],
                this.heap[temp],
            ];
            this.heapify(temp);
        }
    }

    public fixPosition(nodeIdx: number): void {
        const parent = this.parent(nodeIdx);
        if (parent >= 0 && this.heap[parent] < this.heap[nodeIdx]) {
            [this.heap[nodeIdx], this.heap[parent]] = [
                this.heap[parent],
                this.heap[nodeIdx],
            ];
        }
    }
}

console.log('***************************');
console.log('Demo min heap functionality');
let heap: IHeap = new MinHeap(15);
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

console.log('Remove Top', heap.removeTop());
heap.print();
console.log('current size', heap.getCurSize());
console.log('max size', heap.getMaxSize());

console.log('***************************');
console.log('Demo max heap functionality');

heap = new MaxHeap(15);
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
