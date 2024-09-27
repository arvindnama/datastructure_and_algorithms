/**
 * Consider a matrix, where each cell contains either a ‘0’ or a ‘1’, and any cell containing a 1 is called a filled cell. Two cells are said to be connected if they are adjacent to each other horizontally, vertically, or diagonally. If one or more filled cells are also connected, they form a region. find the size of the largest region.
 */

function largestIsland(graph: number[][]): number {
    const moveableCells: [number, number][] = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
        [1, 1],
        [-1, -1],
        [1, -1],
        [-1, 1],
    ];

    /**
     *  Start from 0,0
     *   if cell == 1 -> start traversing and find its length
     *   if cell == 0 --> move to next cell.
     *
     * traversing ->
     *    find all neighboring cells that are movable to
     *    mark my cur pos as visited to i dont end up here again , either vister graph
     *    cell === 0
     *   breaking condition :
     *      if no neighboring cells found curLenght is the length of this island
     *      compare with all other existing values and update.
     */

    let maxLength = 0;

    const canMove = ([i, j]: [number, number]): boolean => {
        return (
            i >= 0 &&
            i < graph.length &&
            j >= 0 &&
            j < graph.length &&
            graph[i][j] === 1
        );
    };
    const getNeighbors = ([i, j]: [number, number]): [number, number][] => {
        const neighbors: [number, number][] = [];
        for (const [pi, pj] of moveableCells) {
            const [ni, nj] = [pi + i, pj + j];
            if (canMove([ni, nj])) {
                neighbors.push([ni, nj]);
            }
        }
        return neighbors;
    };

    const traverse = ([i, j]: [number, number], curLen: number) => {
        graph[i][j] = 0;
        const neighbors = getNeighbors([i, j]);
        if (neighbors.length === 0) {
            maxLength = Math.max(maxLength, curLen);
            return;
        }

        for (const [ni, nj] of neighbors) {
            traverse([ni, nj], curLen + 1);
        }
    };

    for (let i = 0; i < graph.length; i++) {
        for (let j = 0; j < graph.length; j++) {
            if (graph[i][j] === 0) continue;
            traverse([i, j], 1);
        }
    }

    return maxLength;
}

const graph = [
    [1, 1, 0, 0, 0],
    [0, 1, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 0, 0, 0, 0],
    [1, 0, 1, 0, 1],
];

console.log(graph);
console.log("largest island's", largestIsland(graph));
