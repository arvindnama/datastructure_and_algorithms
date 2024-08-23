const disjointSetsUnionRankingPathCompression = () => {
    const parent: number[] = [];
    const rank: number[] = [];

    const findPathCompression = (i: number): number => {
        if (parent[i] === undefined) {
            // item not found initialize
            parent[i] = i;
            rank[i] = 0;
            return i;
        }

        if (parent[i] === i) return i;

        const res = findPathCompression(parent[i]);
        parent[i] = res; // compress path
        return res;
    };

    const unionByRank = (i: number, j: number) => {
        const iRep = findPathCompression(i);
        const jRep = findPathCompression(j);

        if (rank[iRep] > rank[jRep]) {
            // i group is smaller  it is faster to search if merged into j
            parent[jRep] = iRep;
        } else if (rank[jRep] > rank[iRep]) {
            // j group is smaller  it is faster to search if merged into i
            parent[iRep] = jRep;
        } else {
            // order does not matter
            // but the group where we are merging we need to increase the rank by 1
            // as it now grew by one
            parent[iRep] = jRep;
            rank[iRep]++;
        }
    };

    const isDisjoint = (i: number, j: number): boolean => {
        return findPathCompression(i) !== findPathCompression(j);
    };

    return {
        find: findPathCompression,
        union: unionByRank,
        isDisjoint,
    };
};

const ds = disjointSetsUnionRankingPathCompression();

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
console.log(ds.isDisjoint(1, 3));
