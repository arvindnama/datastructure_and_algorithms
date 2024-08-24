/**
 * Krushkal's Algorithm to find minimum spanning tree
 *
 * Spanning tree will have all vertices from graph.
 * Spanning tree will v-1 edges in the tree.
 *
 * Algo:
 *   1. sort all the edges of the graph in increasing order of weight
 *   2. pick the smallest edge which does not form a cycle in resulting tree.
 *   3. repeat till we have picked v-1 edges in the list
 *      if the final result cannot gather v-1 edges spanning tree not possible.
 *
 * For detecting cycle, we use disjoint sets data structure
 *  if by adding an edge u-v will result in a cycle then
 *  u & v will have same Representative Element (or part of same group) in the disjoint sets DS
 */

const miniDisjointSet = () => {
    const parent: number[] = [];
    const rank: number[] = [];

    const findRoot = (u: number): number => {
        if (parent[u] === undefined) {
            parent[u] = u;
            rank[u] = 0;
            return u;
        }
        if (parent[u] === u) return u;
        return (parent[u] = findRoot(parent[u]));
    };
    const addEdge = (u: number, v: number) => {
        const rootU = findRoot(u);
        const rootV = findRoot(v);
        if (rank[rootU] > rank[rootV]) {
            parent[rootV] = rootU;
        } else if (rank[rootU] < rank[rootV]) {
            parent[rootU] = rootV;
        } else {
            parent[rootU] = rootV;
            rank[rootV]++;
        }
    };

    const canAdd = ([u, v]: [number, number]): boolean => {
        // if roots are same then it will form a cycle.
        return findRoot(u) !== findRoot(v);
    };

    return {
        addEdge,
        canAdd,
    };
};

const kruskalMst = (graph: number[][]) => {
    const edges: Array<[number, number, number]> = [];
    graph.forEach((uA, u) => {
        uA.forEach((w, v) => {
            if (w > 0) edges.push([u, v, w]);
        });
    });

    edges.sort(([, , aw], [, , bw]) => aw - bw);
    const ds = miniDisjointSet();

    const spanningTree: Array<[number, number, number]> = [];
    for (let i = 0; i < graph.length; i++) {
        const [u, v, w] = edges.shift() as [number, number, number];
        if (ds.canAdd([u, v])) {
            ds.addEdge(u, v);
            spanningTree.push([u, v, w]);
        }
    }

    console.log(spanningTree);
};

console.log(
    kruskalMst([
        [0, 10, 6, 5],
        [0, 0, 0, 15],
        [0, 0, 0, 4],
        [0, 0, 0, 0],
    ])
);
