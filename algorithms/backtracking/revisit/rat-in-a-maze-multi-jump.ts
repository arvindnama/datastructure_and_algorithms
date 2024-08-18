/**
 * A Maze is given as N*N binary matrix of blocks where source block is the upper left most block i.e., maze[0][0] and destination block is lower rightmost block i.e., maze[N-1][N-1]. A rat starts from source and has to reach destination. The rat can move only in two directions: forward and down.

In the maze matrix, 0 means the block is dead end and non-zero number means the block can be used in the path from source to destination. The non-zero value of mat[i][j] indicates number of maximum jumps rat can make from cell mat[i][j].
 */

import { Coordinates, Matrix } from '../../../models/matrix.models';

const ratInAMazeII = (maze: Matrix): string[] => {
    const n = maze.length;
    const [tx, ty]: Coordinates = [n - 1, n - 1];

    const visited = new Array(n).fill(null).map(() => new Array(n).fill(false));

    const possibleMoves = (jumps: number): Array<Coordinates> => {
        const moves: Coordinates[] = [];
        for (let i = 1; i <= jumps; i++) {
            moves.push([0, i]);
            moves.push([i, 0]);
        }
        return moves;
    };

    const canMove = ([x, y]: Coordinates): boolean => {
        return x >= 0 && x < n && y >= 0 && y < n && !visited[x][y];
    };

    const res: string[] = [];
    const solve = ([x, y]: Coordinates, path: string) => {
        if (x === tx && y === ty) {
            res.push(path);
            return;
        }
        const moves = possibleMoves(maze[x][y]);
        for (let i = 0; i < moves.length; i++) {
            const [px, py] = moves[i];
            const [nx, ny] = [px + x, py + y];

            if (canMove([nx, ny])) {
                visited[nx][ny] = true;
                solve([nx, ny], `${path} (${nx},${ny})`);
                visited[nx][ny] = false;
            }
        }
        return [false, ''];
    };

    solve([0, 0], '(0,0)');
    return res;
};

console.log(
    ratInAMazeII([
        [2, 1, 0, 0],
        [3, 0, 0, 1],
        [0, 1, 0, 1],
        [0, 0, 0, 1],
    ])
);
