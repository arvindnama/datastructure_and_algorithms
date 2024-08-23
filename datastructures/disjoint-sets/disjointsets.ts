const disjointSets = () => {
    /**
     * 2 Sets are called disjoin sets is they don't have any elements in common
     *
     * Operations:
     *  Adding new sets to disjoin set
     *  merging disjoint sets into one union
     * finding the representative element of set.
     * check if 2 sets are disjoint or not.
     *
     *
     *  Array (tree) is used to store multiple disjoint sets
     *  each element in the disjoint set are grouped.
     *  And each group has a unique representative element.
     *
     * a single element in the group will have itself as the representative element.
     *
     *  Merging 2 disjoint set:
     *   find representative elements of both set add add one to another.
     *
     * Find Representative element:
     *   traverse up the tree / parent array until we reach an element who'e RE is itself.
     *
     * Check if 2 sets are disjoint or not:
     *
     *  get RE of both sets and if they are same they are not disjoint , else they are.
     */

    const parent: number[] = [];
    const find = (i: number): number => {
        if (parent[i] === undefined) {
            // element not in disjoint set
            // make it as the representative of the new group.
            parent[i] = i;
            return i;
        }

        if (parent[i] === i) return i;

        /**
         * traverse up the parent tree to get representative element
         */
        return find(parent[i]);
    };

    const union = (i: number, j: number) => {
        const iRep = find(i);
        const jRep = find(j);

        /**
         * merging 2 sets ,
         * In this methods we just blindly merge one into other
         */
        parent[iRep] = jRep;
    };

    const isDisjoint = (i: number, j: number): boolean => {
        const iRep = find(i);
        const jRep = find(j);
        return iRep != jRep; // if both belong to same set they will have same RE.
    };

    return {
        find,
        union,
        isDisjoint,
    };
};

const ds = disjointSets();

// a,b,c,d,e,f,g,h,i,j
// 1,2,3,4,5,6,7,8,9,10
ds.union(1, 2);
ds.union(2, 4);
ds.union(3, 6);
ds.union(3, 9);
ds.union(10, 9);
ds.union(7, 10);

console.log(ds.isDisjoint(1, 2));
console.log(ds.isDisjoint(2, 4));
console.log(ds.isDisjoint(1, 3));
