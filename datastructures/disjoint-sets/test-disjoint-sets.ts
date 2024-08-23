import { DisjointSets } from '../../models/disjoint-sets-model';

const ds = new DisjointSets<number>(10);

// a,b,c,d,e,f,g,h,i,j
// 1,2,3,4,5,6,7,8,9,10
ds.union(1, 2);
ds.union(2, 4);
ds.union(3, 6);
ds.union(3, 9);
ds.union(10, 9);
ds.union(7, 10);

console.log(ds.printSets());

console.log(ds.isDisjoint(1, 2));
console.log(ds.isDisjoint(2, 4));
console.log(ds.isDisjoint(1, 3));
console.log(ds.isDisjoint(1, 3));
