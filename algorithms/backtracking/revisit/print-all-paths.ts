/**
 * Given a directed graph, a source vertex ‘s’ and a destination vertex ‘d’, print all paths from given ‘s’ to ‘d’.
Consider the following directed graph. Let the s be 2 and d be 3. There are 3 different paths from 2 to 3.
 */

const findAllPaths = (graph: number[][], s: number, d: number): string[] => {
    const getAdjNodes = (n: number): number[] => {
        return graph[n]
            .map((aN, idx) => ({ aN, idx }))
            .filter(({ aN }) => aN)
            .map(({ idx }) => idx);
    };

    const res: string[] = [];
    const visited: { [k in number]: boolean } = {};

    const traverse = (n: number, path: string) => {
        if (n === d) {
            res.push(path);
            return;
        }

        const adjN = getAdjNodes(n);
        for (let i = 0; i < adjN.length; i++) {
            const aN = adjN[i];
            if (!visited[aN]) {
                visited[aN] = true;
                traverse(aN, `${path} ${aN}`);
                visited[aN] = false;
            }
        }
    };
    visited[s] = true;
    traverse(s, `${s}`);
    return res;
};

console.log(
    findAllPaths(
        [
            [0, 1, 1, 1],
            [0, 0, 0, 1],
            [1, 1, 0, 0],
            [0, 0, 0, 0],
        ],
        2,
        3
    )
);
