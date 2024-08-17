/**
 * Count the total number of ways or paths that exist between two vertices in a directed graph. These paths don’t contain a cycle, the simple enough reason is that a cycle contains an infinite number of paths and hence they create a problem
 */

import { Graph } from '../../../models/graph.models';

const countAllPaths = (g: Graph<string>, s: string, d: string): string[] => {
    const res: string[] = [];
    // const visited: { [k in number]: boolean } = {};
    const traverse = (s: string, path: string) => {
        if (s === d) {
            res.push(path);
        }

        const adjN = g.getAdjacentNodes(s);
        if (!adjN) return;
        for (let i = 0; i < adjN.length; i++) {
            traverse(adjN[i].node, `${path} ${adjN[i].node}`);
        }
    };
    traverse(s, s);
    return res;
};

const graph = new Graph<string>(5, [
    ['A', 'B'],
    ['A', 'E'],
    ['A', 'C'],
    ['B', 'E'],
    ['B', 'D'],
    ['C', 'E'],
    ['D', 'C'],
]);
console.log(countAllPaths(graph, 'A', 'E'));
console.log(countAllPaths(graph, 'A', 'C'));
