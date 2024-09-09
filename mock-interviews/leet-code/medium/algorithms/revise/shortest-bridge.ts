/**
 * You are given an n x n binary matrix grid where 1 represents land and 0 represents water.

An island is a 4-directionally connected group of 1's not connected to any other 1's. There are exactly two islands in grid.

You may change 0's to 1's to connect the two islands to form one island.

Return the smallest number of 0's you must flip to connect the two islands.
 */

function shortestBridge(grid: number[][]): number {
    /**
     * There are just 2 island
     * 1. to distinguish one from other , we need to mark one of the island by something
     *    else .. lets mark one of the island with all 2
     * 2. we need to get border nodes of island (2)  into a queue
     * 3. perform a BSF from these nodes till we reach other island (1)
     *    since we are performing BSF , we are traversing one level at a time (instead of
     *    depth) first path that reach island(1) is the shortest path. and no. of
     *    moves to reach is the no. of flips needed to connect 2 islands.
     */

    const directions = [
        [0, -1],
        [0, 1],
        [-1, 0],
        [1, 0],
    ];

    const inBounds = ([x, y]: [number, number]): boolean =>
        x >= 0 && x < grid.length && y >= 0 && y < grid.length;

    const pickFirstIsland = (): [number, number] => {
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid.length; j++) {
                if (grid[i][j] === 1) return [i, j];
            }
        }
        return [-1, -1];
    };

    const markIsland = ([x, y]: [number, number]) => {
        grid[x][y] = 2;
        directions.forEach(([dx, dy]) => {
            const [nx, ny] = [dx + x, dy + y];
            if (inBounds([nx, ny]) && grid[nx][ny] == 1) {
                markIsland([nx, ny]);
            }
        });
    };

    markIsland(pickFirstIsland());

    const queue: [number, number, number][] = [];
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid.length; y++) {
            if (grid[x][y] === 2) {
                directions.forEach(([dx, dy]) => {
                    const [nx, ny] = [dx + x, dy + y];
                    if (inBounds([nx, ny]) && grid[nx][ny] == 0) {
                        // only if it is water (boarder) add to queue
                        queue.push([nx, ny, 1]);
                    }
                });
            }
        }
    }

    while (queue.length) {
        const [x, y, move] = queue.shift()!;
        for (const [dx, dy] of directions) {
            const [nx, ny] = [x + dx, y + dy];
            if (inBounds([nx, ny]) && grid[nx][ny] !== 2) {
                if (grid[nx][ny] === 1) {
                    return move;
                }
                grid[nx][ny] = 2;
                queue.push([nx, ny, move + 1]);
            }
        }
    }
    return -1;
}

console.log(
    shortestBridge([
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1],
    ])
);
console.log(
    shortestBridge([
        [0, 1],
        [1, 0],
    ])
);
console.log(
    shortestBridge([
        [0, 1, 0],
        [0, 0, 0],
        [0, 0, 1],
    ])
);
