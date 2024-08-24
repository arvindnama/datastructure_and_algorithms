import { Matrix } from '../../../../models/matrix.models';

const kruskalMst = (graph: Matrix) => {
    /**
     * Sort all edges
     *  pick edge with least w , and that when included in mst will not lead to a circle.
     * repeat till we have v-1 edge in mst
     */

    const miniDisjointSet = () => {
        const parent: number[] = [];
        const rank: number[] = [];

        const findRE = (i: number): number => {
            if (parent[i] === undefined) {
                parent[i] = i;
                rank[i] = 0;
            }
            if (parent[i] === i) return i;
            return (parent[i] = findRE(parent[i]));
        };

        const addEdge = ([u, v]: [number, number]) => {
            const [uR, vR] = [findRE(u), findRE(v)];

            if (rank[uR] > rank[vR]) {
                parent[vR] = uR;
            } else if (rank[uR] < rank[vR]) {
                parent[uR] = vR;
            } else {
                parent[uR] = vR;
                rank[vR]++;
            }
        };

        const canAdd = ([u, v]: [number, number]): boolean => {
            return findRE(u) !== findRE(v);
        };

        return {
            addEdge,
            canAdd,
        };
    };

    const edges: Array<[number, number, number]> = [];

    graph.forEach((arr, u) => {
        arr.forEach((w, v) => {
            if (w > 0) edges.push([u, v, w]);
        });
    });

    edges.sort(([, , a], [, , b]) => a - b);

    const ds = miniDisjointSet();
    const mst = [];
    while (edges.length) {
        const [u, v, w] = edges.shift() as [number, number, number];
        if (ds.canAdd([u, v])) {
            mst.push(`${u} -> ${v} : ${w}`);
            ds.addEdge([u, v]);
        }
    }

    console.log(mst);
};

kruskalMst([
    [0, 10, 6, 5],
    [0, 0, 0, 15],
    [0, 0, 0, 4],
    [0, 0, 0, 0],
]);
