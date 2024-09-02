/**
 * You are given an m x n binary matrix grid. An island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.

The area of an island is the number of cells with a value 1 in the island.

Return the maximum area of an island in grid. If there is no island, return 0.
 */

function maxAreaOfIsland(grid: number[][]): number {
    /**
     * traverse along the matrix row wise
     * if we encounter 1 - get area of the connected island
     *   update the max area tracked globally
     *   and as we visit the cell set to 0 so we don't repate the counting .
     */

    let maxArea = 0;

    const possibleMoves = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];

    const canMove = ([i, j]: [number, number]): boolean => {
        return (
            i >= 0 &&
            i < grid.length &&
            j >= 0 &&
            j < grid[i].length &&
            grid[i][j] === 1
        );
    };

    const getAreaFor = ([i, j]: [number, number], area: number): number => {
        grid[i][j] = 0;
        possibleMoves.forEach(([pi, pj]) => {
            const [ni, nj] = [pi + i, pj + j];
            if (canMove([ni, nj])) {
                area = getAreaFor([ni, nj], area + 1);
            }
        });
        return area;
    };

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === 1) {
                const area = getAreaFor([i, j], 1);
                maxArea = Math.max(maxArea, area);
            }
        }
    }

    return maxArea;
}

console.log(
    maxAreaOfIsland([
        [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
        [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    ])
);
