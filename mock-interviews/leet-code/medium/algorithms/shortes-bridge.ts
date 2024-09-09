/**
 * You are given an n x n binary matrix grid where 1 represents land and 0 represents water.

An island is a 4-directionally connected group of 1's not connected to any other 1's. There are exactly two islands in grid.

You may change 0's to 1's to connect the two islands to form one island.

Return the smallest number of 0's you must flip to connect the two islands.
 */

function shortestBridge(grid: number[][]): number {
    const directions = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
    ];

    const inBoundary = ([x, y]: [number, number]): boolean =>
        x >= 0 && x < grid.length && y >= 0 && y < grid[x].length;

    /**
     * 1. we will need to mark one island as 2 to distinguish it from other island
     * 2. move all boundary nodes to queue
     * 3. perform a BFS on all border nodes till you reach other island ,
     *    since we are doing a BFS , if path is the shortest path
     */

    const pickFirstIsland = (): [number, number] => {
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (grid[i][j] === 1) return [i, j];
            }
        }
        return [-1, -1];
    };

    const markIsland = ([x, y]: [number, number]) => {
        grid[x][y] = 2;
        directions.forEach(([dx, dy]) => {
            const [nx, ny] = [dx + x, dy + y];
            if (inBoundary([nx, ny]) && grid[nx][ny] === 1) {
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
                    if (inBoundary([nx, ny]) && grid[nx][ny] === 0) {
                        queue.push([nx, ny, 1]);
                    }
                });
            }
        }
    }

    while (queue.length) {
        const [x, y, move] = queue.shift()!;
        for (let i = 0; i < directions.length; i++) {
            const [dx, dy] = directions[i];
            const [nx, ny] = [dx + x, dy + y];
            if (inBoundary([nx, ny]) && grid[nx][ny] !== 2) {
                if (grid[nx][ny] === 1) {
                    // reached
                    return move;
                }
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
