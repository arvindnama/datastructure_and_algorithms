/**
 * Given a graph, a source vertex in the graph and a number k, find if there is a simple path (without any cycle) starting from given source and ending at any other vertex such that the distance from source to that vertex is atleast ‘k’ length.
 */

import { Graph } from '../../../models/graph.models';

const findPath = (
    graph: Graph<number>,
    s: number,
    k: number
): Array<[boolean, number, string]> => {
    const visited: { [k in number]: boolean } = {};
    const res: Array<[boolean, number, string]> = [];
    const traverse = (n: number, w: number, path: string) => {
        if (w >= k) {
            res.push([true, w, path]);
            return;
        }

        const adjN = graph.getAdjacentNodes(n);
        if (!adjN) return;
        for (let i = 0; i < adjN.length; i++) {
            // console.log(n, adjN);
            if (!visited[adjN[i].node]) {
                visited[adjN[i].node] = true;
                traverse(
                    adjN[i].node,
                    w + (adjN[i].weight as number),
                    `${path} ${adjN[i].node}`
                );
                visited[adjN[i].node] = false;
            }
        }
    };
    visited[s] = true;
    traverse(s, 0, '0');
    return res;
};

const graph = new Graph<number>(9, [
    [0, 1, 4],
    [1, 0, 4],
    [0, 7, 8],
    [7, 0, 8],
    [1, 2, 8],
    [2, 1, 8],
    [1, 7, 11],
    [7, 1, 11],
    [2, 3, 7],
    [3, 2, 7],
    [2, 8, 2],
    [8, 2, 2],
    [2, 5, 4],
    [5, 2, 4],
    [3, 4, 9],
    [4, 3, 9],
    [3, 5, 14],
    [5, 3, 14],
    [4, 5, 10],
    [5, 4, 10],
    [5, 6, 2],
    [6, 5, 2],
    [6, 7, 1],
    [7, 6, 1],
    [6, 8, 6],
    [8, 6, 6],
    [7, 8, 7],
    [8, 7, 7],
]);

console.log(findPath(graph, 0, 58));
