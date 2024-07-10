/**
 * Given an undirected graph and a number m, the task is to color the given graph with at most m colors such that no two adjacent vertices of the graph are colored with the same color
 */

import { Matrix } from '../../models/matrix.models';

function mColorProblem(graph: Matrix, m: number): boolean {
    const vertices = graph.length - 1;
    const colorMap = Array(vertices).fill(-1);

    const getAdjVertices = (v: number): number[] =>
        graph[v]
            .map((aV, aVIdx) => aVIdx)
            .filter((aVIdx) => graph[v][aVIdx] === 1);

    const canAssignColor = (v: number, color: number): boolean => {
        return getAdjVertices(v).every((aVId) => colorMap[aVId] !== color);
    };

    const allocateColor = (v: number): boolean => {
        // console.log(colorMap);
        if (v > vertices) {
            return colorMap.every((c) => c !== -1);
        }

        for (let i = 1; i <= m; i++) {
            if (canAssignColor(v, i)) {
                colorMap[v] = i;
                if (allocateColor(v + 1)) {
                    return true;
                }
                colorMap[v] = -1;
            }
        }

        return false;
    };

    const res = allocateColor(0);
    console.log('color map', colorMap);
    return res;
}

let graph = [
    [0, 1, 1, 1],
    [1, 0, 1, 0],
    [1, 1, 0, 1],
    [1, 0, 1, 0],
];

console.log(graph);
console.log('solve m-color problem');
console.log(mColorProblem(graph, 3));

graph = [
    [1, 1, 1, 1],
    [1, 1, 1, 0],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
];

console.log(graph);
console.log('solve m-color problem');
console.log(mColorProblem(graph, 3));
