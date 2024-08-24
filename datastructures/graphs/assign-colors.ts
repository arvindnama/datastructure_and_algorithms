/**
 * Graph coloring refers to the problem of coloring vertices of a graph in such a way that no two adjacent vertices have the same color. This is also called the vertex coloring problem. If coloring is done using at most m colors, it is called m-coloring.
 */

import { Matrix } from '../../models/matrix.models';

function graphColoring(graph: Matrix, m: number): number[] {
    const vertices: number[] = [];

    const canAssignColor = (v: number, c: number): boolean => {
        return graph[v]
            .map((w, u) => ({ w, u }))
            .filter(({ w }) => w)
            .every(({ u }) => vertices[u] !== c);
    };

    const assignColor = (v: number): boolean => {
        if (v === graph.length) {
            // all vertices are colored
            return true;
        }
        for (let c = 1; c <= m; c++) {
            if (canAssignColor(v, c)) {
                vertices[v] = c;
                const res = assignColor(v + 1);
                if (res) return res;
                vertices[v] = -1;
            }
        }
        return false;
    };

    return assignColor(0) ? vertices : [];
}

console.log(
    graphColoring(
        [
            [0, 1, 1, 1],
            [1, 0, 1, 0],
            [1, 1, 0, 1],
            [1, 0, 1, 0],
        ],
        3
    )
);
