/**
 * Given the root of a Directed graph , The task is to check whether the graph contains a cycle or not.
 */

import { Matrix } from '../../models/matrix.models';

const printCycles = (graph: Matrix): string[] => {
    const res: string[] = [];

    const getAdjNodes = (v: number): number[] =>
        graph[v]
            .map((n, i) => ({ n, i }))
            .filter(({ n }) => n === 1)
            .map(({ i }) => i);

    const traverse = (
        v: number,
        visited: { [k in number]: boolean },
        path: string
    ): boolean => {
        if (visited[v]) {
            // loop detected.
            res.push(path);
            return true;
        }
        visited[v] = true;
        const adjNodes = getAdjNodes(v);
        if (!adjNodes?.length) return true;

        for (let i = 0; i < adjNodes.length; i++) {
            const res = traverse(
                adjNodes[i],
                visited,
                `${path} ${adjNodes[i]}`
            );
            if (res) return res;
        }

        visited[v] = false;

        return false;
    };

    for (let i = 0; i < graph.length; i++) {
        const visited: { [k in number]: boolean } = {};
        traverse(i, visited, `${i}`);
    }

    return res;
};

console.log(
    printCycles([
        [0, 1, 1, 0],
        [0, 0, 1, 0],
        [1, 0, 0, 1],
        [0, 0, 0, 1],
    ])
);

console.log(
    printCycles([
        [0, 1, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
        [0, 0, 0, 0],
    ])
);
