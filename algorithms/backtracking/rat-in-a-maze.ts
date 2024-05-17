/**
 * Consider a rat placed at (0, 0) in a square matrix of order N * N. It has to reach the destination at (N – 1, N – 1). Find all possible paths that the rat can take to reach from source to destination. The directions in which the rat can move are ‘U'(up), ‘D'(down), ‘L’ (left), ‘R’ (right). Value 0 at a cell in the matrix represents that it is blocked and rat cannot move to it while value 1 at a cell in the matrix represents that rat can be travel through it. Return the list of paths in lexicographically increasing order.

Note: In a path, no cell can be visited more than one time. If the source cell is 0, the rat cannot move to any other cell.
 */

import { Coordinates, Matrix } from '../../models/matrix.models';

function ratInAMaze(maze: Matrix) {
    const n = maze.length;

    const visited: boolean[][] = Array(n)
        .fill([])
        .map(() => Array(n).fill(false));

    const possibleMoves: [number, number, string][] = [
        [-1, -1, 'U'],
        [1, 1, 'D'],
        [0, 1, 'R'],
        [0, -1, 'L'],
    ];

    const canMove = ([x, y]: Coordinates): boolean =>
        x >= 0 &&
        y >= 0 &&
        x < n &&
        y < n &&
        !visited[x][y] &&
        maze[x][y] === 1;

    const traverse = ([x, y]: Coordinates, path: string[]): string[] => {
        if (x === n - 1 && y === n - 1) {
            return path;
        }

        for (let i = 0; i < possibleMoves.length; i++) {
            const [px, py, pSym] = possibleMoves[i];
            const [nx, ny] = [x + px, y + py];

            if (canMove([nx, ny])) {
                visited[nx][ny] = true;
                const res = traverse([nx, ny], [...path, pSym]);
                if (res.length) {
                    return res;
                } else {
                    visited[nx][ny] = false;
                }
            }
        }
        return [];
    };

    visited[0][0] = true;
    return traverse([0, 0], []);
}

const maze = [
    [1, 0, 0, 0],
    [1, 1, 0, 1],
    [1, 1, 0, 0],
    [0, 1, 1, 1],
];

console.log(maze);
console.log('Rat path', ratInAMaze(maze));
