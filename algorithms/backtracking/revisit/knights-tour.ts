/**
 * Given a N*N board with the Knight placed on the first block of an empty board. Moving according to the rules of chess knight must visit each square exactly once. Print the order of each cell in which they are visited
 */

import { Coordinates, Matrix } from '../../../models/matrix.models';

const knightsTour = (n: number): number[][] | null => {
    const visited: Matrix = Array(n)
        .fill([])
        .map(() => Array(n).fill(0));

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
        x >= 0 && y >= 0 && x < n && y < n && visited[x][y] === 0;

    const traverse = (r: number, c: number, moves: number): boolean => {
        if (moves === n * n) return true;

        for (let i = 0; i < possibleMoves.length; i++) {
            const [x, y] = possibleMoves[i];
            const [nr, nc] = [r + x, c + y];
            if (canMove([nr, nc])) {
                visited[nr][nc] = 1;
                const res = traverse(nr, nc, moves + 1);
                if (res) return res;
                visited[nr][nc] = 0;
            }
        }
        return false;
    };

    visited[0][0] = 1;
    const res = traverse(0, 0, 1);
    return res ? visited : null;
};

console.log(knightsTour(8));
