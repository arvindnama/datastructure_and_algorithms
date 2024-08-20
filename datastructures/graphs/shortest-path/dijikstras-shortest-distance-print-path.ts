/**
 * Given a weighted graph and a source vertex in the graph, find the shortest paths from the source to all the other vertices in the given graph.

Note: The given graph does not contain any negative edge.
 */

import { Matrix } from '../../../models/matrix.models';

const dijikstrasShortestPath = (
    graph: Matrix,
    src: number
): Array<{ w: number; path: string }> => {
    /**
     * In this method, we navigate each vertex from src and its adj Nodes.
     * and every every adjNode distance is adjusted if the mini distance from src is greater that its previously calculated distance
     *
     *
     * lets have a SPT with shortest distance and path to all vertices (start with Infi)
     * maintain a visited array.
     * Pick a vertex v from SPT with shorted distance from src & not already visited.
     *  * get all its neighbors & for each neighbor update SPT if its distance is lower than what is already recorded and update path.
     */

    const spt: Array<{ w: number; path: string }> = new Array(graph.length)
        .fill(null)
        .map(() => ({ w: Number.MAX_VALUE, path: `${src}` }));
    const visited: boolean[] = [];
    spt[src].w = 0;
    const pickVertex = () =>
        spt
            .map((w, v) => ({ ...w, v }))
            .filter(({ v }) => !visited[v])
            .reduce(
                (acc, cur) => {
                    return cur.w <= acc.w ? cur : acc;
                },
                { w: Number.MAX_VALUE, v: -1 }
            ).v;
    const getAdjNodes = (v: number): number[] => {
        return graph[v]
            .map((w, idx) => ({ w, idx }))
            .filter(({ w }) => w > 0)
            .map(({ idx }) => idx);
    };

    let v = pickVertex();
    while (v !== -1) {
        visited[v] = true;
        const adjNodes = getAdjNodes(v);

        for (let i = 0; i < adjNodes.length; i++) {
            const u = adjNodes[i];
            const newDistance = spt[v].w + graph[v][u];
            const existingDist = spt[u].w;
            if (newDistance < existingDist) {
                const newPath = `${spt[v].path} ${u}`;
                spt[u] = {
                    w: newDistance,
                    path: newPath,
                };
            }
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
