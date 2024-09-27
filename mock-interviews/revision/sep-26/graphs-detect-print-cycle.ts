/**
 * Given the root of a Directed graph , The task is to check whether the graph contains a cycle or not.
 */

import { Matrix } from '../../../models/matrix.models';

const printCycles = (graph: Matrix): string[] => {
    /**
     * Goal is to find all from starting from every node as root.
     */

    const getAdjNodes = (idx: number): number[] => {
        return graph[idx]
            .map((v, idx) => ({ idx, v }))
            .filter(({ v }) => v !== 0)
            .map(({ idx }) => idx);
    };

    const traverse = (
        idx: number,
        path: number[],
        visited: boolean[]
    ): number[] | null => {
        /*
          we will need to see if cur node is already visited then we are in a loop
          else we will dive deeper into idx's adj Node and recurse
        */

        if (visited[idx]) {
            // loop
            return [...path, idx];
        }

        visited[idx] = true;
        path = [...path, idx]; // since we are cloning and adding we dont need to remove
        const adjNodes = getAdjNodes(idx);
        for (let i = 0; i < adjNodes.length; i++) {
            const node = adjNodes[i];
            const loop = traverse(node, path, visited);
            if (loop) {
                return loop;
            }
        }
        visited[idx] = false;

        return null;
    };

    const res: string[] = [];
    for (let i = 0; i < graph.length; i++) {
        const loop = traverse(i, [], []);
        if (loop) {
            res.push(loop.join('->'));
        }
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
