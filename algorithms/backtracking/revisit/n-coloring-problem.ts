/**
 * Given an undirected graph and a number m, the task is to color the given graph with at most m colors such that no two adjacent vertices of the graph are colored with the same color

Note: Here coloring of a graph means the assignment of colors to all vertices


 */

const mColoringProblem = (graph: number[][], m: number): number[] => {
    const vertices = new Array(m).fill(-1);

    const canColorVertex = (v: number, c: number): boolean => {
        const neighbors = graph[v]
            .map((n, idx) => ({ n, idx }))
            .filter(({ n }) => n === 1)
            .map(({ idx }) => idx);
        return neighbors.every((n) => vertices[n] !== c);
    };

    const color = (v: number): boolean => {
        if (v === graph.length) return true;

        for (let i = 1; i <= m; i++) {
            if (canColorVertex(v, i)) {
                vertices[v] = i;
                const res = color(v + 1);
                if (res) return res;
                if (!res) vertices[v] = -1;
            }
        }
        return false;
    };

    return color(0) ? vertices : [];
};

console.log(
    mColoringProblem(
        [
            [0, 1, 1, 1],
            [1, 0, 1, 0],
            [1, 1, 0, 1],
            [1, 0, 1, 0],
        ],
        3
    )
);

console.log(
    mColoringProblem(
        [
            [1, 1, 1, 1],
            [1, 1, 1, 0],
            [1, 1, 1, 1],
            [1, 1, 1, 1],
        ],
        3
    )
);
