import { Graph, NodeVisited } from '../../models/graph.models';

function printPath(graph: Graph<number>, s: number, e: number): number[] {
    const visited: NodeVisited = {};

    const traverse = (n: number, path: number[]): boolean => {
        visited[n] = true;
        path.push(n);
        if (n === e && path.length > 1) {
            // ensure if start & end node are same they should not default to true
            return true;
        }
        const adjNodes = graph.getAdjacentNodes(n) || [];
        for (let i = 0; i < adjNodes.length; i++) {
            const v = adjNodes[i];
            if (!visited[v.node]) {
                if (traverse(v.node, path)) {
                    return true;
                }
            }
        }
        return false;
    };
    const path: number[] = [];
    const found = traverse(s, path);
    return found ? path : [];
}

function printPathToAllNodes(graph: Graph<number>, s: number): string[] {
    return graph.vertices.map(
        (v) => `${s} to ${v} :: ${printPath(graph, s, +v).join('->')}`
    );
}

console.group('Print All Paths');

const g = new Graph(7, [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 0],
    [2, 6],
    [2, 5],
    [3, 1],
    [3, 4],
    [4, 3],
    [5, 4],
    [5, 6],
    [6, 5],
]);

g.print();

console.log(`Path from 3 to 2`, printPathToAllNodes(g, 2));
