import { Matrix } from '../../../models/matrix.models';

const primsMst = (graph: Matrix) => {
    const n = graph.length;
    const mstSet = new Array(n).fill(false);
    const parent = [];
    const keys: number[] = new Array(n).fill(Number.MAX_VALUE);

    parent[0] = -1;
    keys[0] = 0;

    const pickMin = () => {
        return Object.keys(mstSet)
            .map((v) => ({ v: +v, isInMst: mstSet[+v] }))
            .filter(({ isInMst }) => !isInMst)
            .reduce(
                (acc, cur) => {
                    if (keys[cur.v] < acc.w) {
                        return { w: keys[cur.v], v: cur.v };
                    }
                    return acc;
                },
                { w: Number.MAX_VALUE, v: -1 }
            ).v;
    };

    for (let i = 0; i < n - 1; i++) {
        // V-1 edges in Spanning tree.
        const u = pickMin();
        mstSet[u] = true;

        for (let v = 0; v < n; v++) {
            if (graph[u][v] && !mstSet[v] && graph[u][v] < keys[v]) {
                parent[v] = u;
                keys[v] = graph[u][v];
            }
        }
    }

    const mstEdges = [];
    for (let i = 1; i < n; i++) {
        mstEdges.push([`${parent[i]} --> ${i}`, graph[i][parent[i]]]);
    }

    console.log(mstEdges);
};

primsMst([
    [0, 2, 0, 6, 0],
    [2, 0, 3, 8, 5],
    [0, 3, 0, 0, 7],
    [6, 8, 0, 0, 9],
    [0, 5, 7, 9, 0],
]);
