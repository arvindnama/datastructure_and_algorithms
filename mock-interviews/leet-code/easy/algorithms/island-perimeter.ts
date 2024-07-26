/**
 * You are given row x col grid representing a map where grid[i][j] = 1 represents land and grid[i][j] = 0 represents water.

Grid cells are connected horizontally/vertically (not diagonally). The grid is completely surrounded by water, and there is exactly one island (i.e., one or more connected land cells).

The island doesn't have "lakes", meaning the water inside isn't connected to the water around the island. One cell is a square with side length 1. The grid is rectangular, width and height don't exceed 100. Determine the perimeter of the island.
 */

function islandPerimeter(grid: number[][]): number {
    let perimeter = 0;

    const isLand = ([i, j]: Array<number>): boolean =>
        i >= 0 &&
        i < grid.length &&
        j >= 0 &&
        j < grid[i].length &&
        grid[i][j] === 1;

    const getAdjNodesWaterCovered = (i: number, j: number): number =>
        [
            [i - 1, j],
            [i, j - 1],
            [i + 1, j],
            [i, j + 1],
        ].reduce((acc, cur) => acc + (!isLand(cur) ? 1 : 0), 0);

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (isLand([i, j])) perimeter += getAdjNodesWaterCovered(i, j);
        }
    }
    return perimeter;
}

console.log(
    islandPerimeter([
        [0, 1, 0, 0],
        [1, 1, 1, 0],
        [0, 1, 0, 0],
        [1, 1, 0, 0],
    ])
);

console.log(islandPerimeter([[1]]));
console.log(islandPerimeter([[1, 0]]));
