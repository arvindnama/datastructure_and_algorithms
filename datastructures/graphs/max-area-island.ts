/**
 * Given a binary 2D matrix, find area of the largest region of 1s which are connected horizontally, vertically or diagonally.
 */

import { Matrix } from '../../models/matrix.models';

const largestArea = (graph: Matrix): number => {
    const n = graph.length;
    const possibleMoves = [
        [0, 1],
        [1, 0],
        [-1, 0],
        [0, -1],
        [1, 1],
        [1, -1],
        [-1, -1],
        [-1, 1],
    ];

    const canMove = ([x, y]: [number, number]): boolean =>
        x >= 0 && x < n && y >= 0 && y < n && graph[x][y] === 1;

    const traverse = ([x, y]: [number, number], area: number): number => {
        graph[x][y] = 0; // mark as visited

        for (let i = 0; i < possibleMoves.length; i++) {
            const [px, py] = possibleMoves[i];
            const [nx, ny] = [x + px, y + py];

            if (canMove([nx, ny])) {
                return traverse([nx, ny], area + 1);
            }
        }
        return area;
    };

    let maxArea = 0;
    for (let x = 0; x < n; x++) {
        for (let y = 0; y < n; y++) {
            if (graph[x][y]) {
                const area = traverse([x, y], 1);
                maxArea = Math.max(area, maxArea);
            }
        }
    }
    return maxArea;
};

console.log(
    largestArea([
        [0, 0, 1, 1, 0],
        [1, 0, 1, 1, 0],
        [0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1],
    ])
);
