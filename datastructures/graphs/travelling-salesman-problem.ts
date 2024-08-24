/***
 * Travelling Salesman Problem (TSP) : Given a set of cities and distances between every pair of cities, the problem is to find the shortest possible route that visits every city exactly once and returns to the starting point.
Note the difference between Hamiltonian Cycle and TSP. The Hamiltonian cycle problem is to find if there exists a tour that visits every city exactly once. Here we know that Hamiltonian Tour exists (because the graph is complete) and in fact, many such tours exist, the problem is to find a minimum weight Hamiltonian Cycle.
For example, consider the graph shown in the figure on the right side. A TSP tour in the graph is 1-2-4-3-1. The cost of the tour is 10+25+30+15 which is 80.
 */

import { Matrix } from '../../models/matrix.models';

function travllingSalesmanProblem(
    graph: Matrix,
    s: number
): [number, number[]] {
    let [minCost, shortestPath]: [number, number[]] = [Number.MAX_VALUE, []];
    const visited: boolean[] = [];

    const getNeighbors = (u: number): number[] =>
        graph[u]
            .map((w, v) => ({ w, v }))
            .filter(({ w }) => w)
            .map(({ v }) => v);

    const traverse = (u: number, path: number[], cost: number) => {
        if (path.length === graph.length + 1) {
            // visited all nodes and might have reach the starting node.

            if (u === path[0]) {
                // i have visited all nodes & reached src
                if (cost < minCost) {
                    minCost = cost;
                    shortestPath = path;
                }
            }
            return;
        }

        getNeighbors(u).forEach((v) => {
            if (!visited[v]) {
                visited[v] = true;
                traverse(v, [...path, v], cost + graph[u][v]);
                visited[v] = false;
            }
        });
    };

    traverse(s, [0], 0);
    return [minCost, shortestPath];
}

console.log(
    travllingSalesmanProblem(
        [
            [0, 10, 15, 20],
            [10, 0, 35, 25, 0],
            [15, 35, 0, 30, 0],
            [20, 25, 30, 0, 0],
        ],
        0
    )
);
