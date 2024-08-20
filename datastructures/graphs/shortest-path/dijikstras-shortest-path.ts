/**
 * Given a weighted graph and a source vertex in the graph, find the shortest paths from the source to all the other vertices in the given graph.

Note: The given graph does not contain any negative edge.
 */

import { Matrix } from '../../../models/matrix.models';

const dijikstrasShortestPath = (graph: Matrix, src: number): number[] => {
    const spt = new Array(graph.length).fill(Number.MAX_VALUE);
    const visited: boolean[] = [];
    spt[src] = 0;

    const pickVertex = (): number =>
        spt
            .map((w, v) => ({ w, v }))
            .filter(({ v }) => !visited[v])
            .reduce(
                (acc, cur) => {
                    return cur.w <= acc.w ? cur : acc;
                },
                { v: -1, w: Number.MAX_VALUE }
            ).v;

    const getAdjNodes = (v: number) =>
        graph[v]
            .map((w, idx) => ({ w, idx }))
            .filter(({ w }) => w > 0)
            .map(({ idx }) => idx);

    let v = pickVertex();
    while (v >= 0) {
        visited[v] = true;
        const adjNodes = getAdjNodes(v);
        for (let i = 0; i < adjNodes.length; i++) {
            const u = adjNodes[i];
            const existingDist = spt[u];
            const newDist = spt[v] + graph[v][u];
            spt[u] = Math.min(existingDist, newDist);
        }
        v = pickVertex();
    }

    return spt;
};

console.log(
    dijikstrasShortestPath(
        [
            [0, 4, 0, 0, 0, 0, 0, 8, 0],
            [4, 0, 8, 0, 0, 0, 0, 11, 0],
            [0, 8, 0, 7, 0, 4, 0, 0, 2],
            [0, 0, 7, 0, 9, 14, 0, 0, 0],
            [0, 0, 0, 9, 0, 10, 0, 0, 0],
            [0, 0, 4, 14, 10, 0, 2, 0, 0],
            [0, 0, 0, 0, 0, 2, 0, 1, 6],
            [8, 11, 0, 0, 0, 0, 1, 0, 7],
            [0, 0, 2, 0, 0, 0, 6, 7, 0],
        ],
        0
    )
);
