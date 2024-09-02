/**
 * Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.
 */

function numIslands(grid: string[][]): number {
    /**
     * traverse the grid matrix row-wise
     * when we encounter an island we start navigating to cover the island
     * once done we have 1 island visited
     *  we continue the main matrix traversal to find start and next island and continue.
     *
     * every time we visit an island mark it as 0 so we dont visit again.
     */

    let islandCount = 0;
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
            j <= grid[i].length &&
            grid[i][j] === '1'
        );
    };
    const coverIsland = ([i, j]: [number, number]) => {
        grid[i][j] = '0';
        possibleMoves.forEach(([pi, pj]) => {
            const [ni, nj] = [pi + i, pj + j];
            if (canMove([ni, nj])) {
                coverIsland([ni, nj]);
            }
        });
    };

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === '1') {
                // start of island, cover the island.
                islandCount++;
                coverIsland([i, j]);
            }
        }
    }
    return islandCount;
}

console.log(
    numIslands([
        ['1', '1', '1', '1', '0'],
        ['1', '1', '0', '1', '0'],
        ['1', '1', '0', '0', '0'],
        ['0', '0', '0', '0', '0'],
    ])
);

console.log(
    numIslands([
        ['1', '1', '0', '0', '0'],
        ['1', '1', '0', '0', '0'],
        ['0', '0', '1', '0', '0'],
        ['0', '0', '0', '1', '1'],
    ])
);
