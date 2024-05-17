/**
 * Consider a matrix, where each cell contains either a ‘0’ or a ‘1’, and any cell containing a 1 is called a filled cell. Two cells are said to be connected if they are adjacent to each other horizontally, vertically, or diagonally. If one or more filled cells are also connected, they form a region. find the size of the largest region.
 */

function largestIsland(graph: number[][]): number {
    const visitedMatrix: boolean[][] = graph.map((r) => r.map(() => false));

    const findNextIsland = (): Nullable<[number, number]> => {
        for (let i = 0; i < graph.length; i++) {
            for (let j = 0; j < graph[i].length; j++) {
                if (!visitedMatrix[i]?.[j] && graph[i][j] === 1) {
                    return [i, j];
                }
            }
        }
        return;
    };

    const possibleMoves: Array<[number, number]> = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
        [-1, -1],
        [1, 1],
        [1, -1],
        [-1, 1],
    ];
    const canMove = (x: number, y: number): boolean =>
        x >= 0 &&
        x < graph[0].length &&
        y >= 0 &&
        y < graph.length &&
        visitedMatrix[x][y] === false;

    let length = 0;
    let largestIsland = 0;
    const traverse = ([x, y]: [number, number]) => {
        visitedMatrix[x][y] = true;
        length++;
        possibleMoves.forEach(([px, py]) => {
            const [nx, ny]: [number, number] = [x + px, y + py];
            if (canMove(nx, ny)) {
                visitedMatrix[nx][ny] = true;
                if (graph[nx][ny] === 1) {
                    traverse([nx, ny]);
                }
            }
        });
    };

    let island = findNextIsland();
    while (island) {
        length = 0;
        traverse(island);
        largestIsland = Math.max(length, largestIsland);
        island = findNextIsland();
    }

    return largestIsland;
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
