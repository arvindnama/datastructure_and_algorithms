/**
 * Given a square chessboard of N x N size, the position of the Knight and the position of a target are given. We need to find out the minimum steps a Knight will take to reach the target position.
 */

import { Coordinates } from '../../models/matrix.models';

function minStepsToReachTarget(
    n: number,
    [sx, sy]: Coordinates,
    [tx, ty]: Coordinates
): number {
    const visited: boolean[][] = Array(n)
        .fill([])
        .map(() => Array(n).fill(false));

    const possibleMoves: Coordinates[] = [
        [-1, -2],
        [-1, 2],
        [1, -2],
        [1, 2],
        [-2, -1],
        [-2, 1],
        [2, -1],
        [2, 1],
    ];

    const canMove = ([x, y]: Coordinates) =>
        x >= 0 && y >= 0 && x < n && y < n && !visited[x]?.[y];

    const queue: { c: Coordinates; dist: number }[] = [];

    visited[sx][sy] = true;
    queue.push({ c: [sx, sy], dist: 0 });
    while (queue.length) {
        const {
            c: [sx, sy],
            dist,
        } = queue.shift() as { c: Coordinates; dist: number };
        if (sx === tx && sy === ty) {
            return dist;
        }
        for (let i = 0; i < possibleMoves.length; i++) {
            const [px, py] = possibleMoves[i];
            const [nx, ny]: Coordinates = [sx + px, sy + py];
            if (canMove([nx, ny])) {
                visited[nx][ny] = true;
                queue.push({ c: [nx, ny], dist: dist + 1 });
            }
        }
    }
    return -1;
}

console.log(
    'knight path from (1,3) to (5,0)',
    minStepsToReachTarget(6, [1, 3], [5, 0])
);
console.log(
    'knight path from (1,1) to (29,29)',
    minStepsToReachTarget(30, [1, 1], [29, 29])
);
