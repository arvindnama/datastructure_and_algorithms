import { MinHeap } from '../../models/heap.models';

console.log('Demo min heap functionality');

const heap = new MinHeap(15);
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
