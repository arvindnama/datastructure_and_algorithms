import { Matrix } from '../../../models/matrix.models';

const primsMst = (graph: Matrix) => {
    /**
     * Prims Algorithm : finds the minimum spanning tree.
     *  Algo:
     *      Start with any arbitrary vertex to be part of mst.
     *      find all edges initiating from vertex in the mst so far
     *      pick a edge which has min w and does not lead to a cycle.
     *      include the edge into mst (other end of the edge into mst)
     *      repeat till all vertices are in mst.
     */
    const n = graph.length;
    const partOfMst = new Array(n).fill(false);

    const edgesInMst: Array<{ v: number; w: number; parent: number }> =
        new Array(n)
            .fill(-1)
            .map((_, v) => ({ v, w: Number.MAX_VALUE, parent: -1 }));

    const pickMin = (): number =>
        Object.keys(partOfMst)
            .map((v) => ({ v: +v, isPartOfMst: partOfMst[+v] }))
            .filter(({ isPartOfMst }) => !isPartOfMst)
            .reduce(
                (acc, cur) => {
                    if (edgesInMst[cur.v].w < acc.w)
                        return { w: edgesInMst[cur.v].w, v: cur.v };
                    return acc;
                },
                { w: Number.MAX_VALUE, v: -1 }
            ).v;

    const getAdjNodes = (u: number): number[] =>
        graph[u]
            .map((w, v) => ({ v, w }))
            .filter(({ w }) => w > 0)
            .map(({ v }) => v);

    edgesInMst[0].w = 0;
    let u = pickMin();
    while (u !== -1) {
        // For all the adjNodes of u
        // update mst if there edges u -> v are lower than
        // other edges leading up to v.
        partOfMst[u] = true;
        getAdjNodes(u)
            .filter((adjN) => !partOfMst[adjN])
            .forEach((v) => {
                if (graph[u][v] < (edgesInMst[v]?.w ?? Number.MAX_VALUE)) {
                    // edge u-v has weight lower than
                    // i -> v (i being an vertex already in mst)
                    // hence update the mst map
                    edgesInMst[v] = {
                        v,
                        w: graph[u][v],
                        parent: u,
                    };
                }
            });
        u = pickMin();
    }
    console.log(
        edgesInMst.slice(1).map((e) => `${e.parent} --> ${e.v} : ${e.w}`)
    );
};

primsMst([
    [0, 2, 0, 6, 0],
    [2, 0, 3, 8, 5],
    [0, 3, 0, 0, 7],
    [6, 8, 0, 0, 9],
    [0, 5, 7, 9, 0],
]);
