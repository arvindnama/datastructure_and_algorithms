/**
 * Hamiltonian Path in a graph G is a path that visits every vertex of G exactly once and Hamiltonian Path doesn’t have to return to the starting vertex. It’s an open path.
 */

function findHamiltonianPath(g: number[][]): number[] | null {
    const n: number = g.length;

    const path: number[] = [];

    const getAdjVertices = (v: number) =>
        g.map((v, vIdx) => vIdx).filter((vIdx) => g[v][vIdx] === 1);

    const canMove = (v: number) =>
        !path.find((pV) => v === pV) || path[0] === v;

    const traverse = (v: number): boolean => {
        if (v === path[0] && path.length === n + 1) return true;

        const adjVertices = getAdjVertices(v);
        for (let i = 0; i < adjVertices.length; i++) {
            const adjV = adjVertices[i];

            if (canMove(adjV)) {
                path.push(adjV);
                if (traverse(adjV)) {
                    return true;
                } else {
                    path.pop();
                }
            }
        }
        return false;
    };

    path.push(0);
    return traverse(0) ? path : null;
}

let g = [
    [0, 1, 0, 1, 0],
    [1, 0, 1, 1, 1],
    [0, 1, 0, 0, 1],
    [1, 1, 0, 0, 1],
    [0, 1, 1, 1, 0],
];

console.log(g);
console.log('Hamiltonian path', findHamiltonianPath(g));

g = [
    [0, 1, 0, 1, 0],
    [1, 0, 1, 1, 1],
    [0, 1, 0, 0, 1],
    [1, 1, 0, 0, 0],
    [0, 1, 1, 0, 0],
];

console.log(g);
console.log('Hamiltonian path', findHamiltonianPath(g));
