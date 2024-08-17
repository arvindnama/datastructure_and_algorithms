/**
 * Hamiltonian Cycle or Circuit in a graph G is a cycle that visits every vertex of G exactly once and returns to the starting vertex.
 *
 * Given an undirected graph, the task is to determine whether the graph contains a Hamiltonian cycle or not. If it contains, then prints the path.
 */

const isHamiltonCycle = (graph: number[][]): number[] => {
    const getNeighbors = (v: number) => {
        return graph[v]
            .map((n, idx) => ({ n, idx }))
            .filter(({ n }) => n === 1)
            .map(({ idx }) => idx);
    };
    const traverse = (
        v: number,
        visited: number[],
        path: number[]
    ): [boolean, number[]] => {
        const neighbors = getNeighbors(v);
        if (path.length === graph.length && neighbors.includes(path[0]))
            return [true, [...path, path[0]]];

        for (let i = 0; i < neighbors.length; i++) {
            const n = neighbors[i];
            if (visited[n] === -1) {
                visited[n] = 1;
                const res = traverse(neighbors[i], visited, [...path, n]);
                if (res[0]) return res;
                if (!res[0]) {
                    visited[n] = -1;
                }
            }
        }
        return [false, []];
    };

    for (let i = 0; i < 1; i++) {
        const visited = new Array(graph.length).fill(-1);
        visited[i] = 1;
        const [res, path] = traverse(i, visited, [i]);
        if (res) {
            return path;
        }
    }

    return [];
};

console.log(
    isHamiltonCycle([
        [0, 1, 0, 1, 0],
        [1, 0, 1, 1, 1],
        [0, 1, 0, 0, 1],
        [1, 1, 0, 0, 1],
        [0, 1, 1, 1, 0],
    ])
);

console.log(
    isHamiltonCycle([
        [0, 1, 0, 1, 0],
        [1, 0, 1, 1, 1],
        [0, 1, 0, 0, 1],
        [1, 1, 0, 0, 0],
        [0, 1, 1, 0, 0],
    ])
);
