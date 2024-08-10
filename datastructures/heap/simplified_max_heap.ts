/**
 * Write a simplified version of heap
 * that can be easily built for lead code problems
 * like kth largest or k smallest element.
 */

interface ISimpleHeap {
    insert(n: number): void;
    removeTop(): number;
    print(): void;
}

const maxHeap = (size: number): ISimpleHeap => {
    const heap: number[] = [];

    const fixPos = (n: number) => {
        const parent = Math.floor((n - 1) / 2);
        if (parent >= 0 && heap[parent] < heap[n]) {
            [heap[parent], heap[n]] = [heap[n], heap[parent]];
            fixPos(parent);
        }
    };

    const heapify = (n: number) => {
        const l = 2 * n + 1;
        const r = 2 * n + 2;
        let t = n;
        if (l < heap.length && heap[t] < heap[l]) t = l;
        if (r < heap.length && heap[t] < heap[r]) t = r;

        if (t !== n) {
            [heap[t], heap[n]] = [heap[n], heap[t]];
        }
    };
    return {
        print() {
            console.log(heap);
        },
        insert(n: number) {
            if (heap.length === size) throw 'no space';
            heap.push(n);
            fixPos(heap.length - 1);
        },
        removeTop(): number {
            const val = heap[0];
            heap[0] = heap[heap.length - 1];
            heapify(0);
            heap.length--;
            return val;
        },
    };
};

const heap = maxHeap(3);
console.log('insert  3', heap.insert(3));
heap.print();
console.log('insert 10', heap.insert(10));
heap.print();
console.log('insert 12', heap.insert(12));
heap.print();

console.log('remove top', heap.removeTop());
heap.print();
console.log('insert  8', heap.insert(8));
heap.print();
console.log('remove top', heap.removeTop());
heap.print();
console.log('insert  2', heap.insert(2));
heap.print();
console.log('remove top', heap.removeTop());
heap.print();
console.log('insert 14', heap.insert(14));
heap.print();
