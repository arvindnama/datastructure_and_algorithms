/**
 * Given a square maze containing positive numbers, find all paths from a corner cell (any of the extreme four corners) to the middle cell. We can move exactly n steps from a cell in 4 directions i.e. North, East, West and South where n is value of the cell,

We can move to mat[i+n][j], mat[i-n][j], mat[i][j+n], and mat[i][j-n] from a cell mat[i][j] where n is value of mat[i][j].
 */

import { Coordinates, Matrix } from '../../../models/matrix.models';

const findPathInMaze = (maze: Matrix): string[] => {
    const mazeSize = maze.length;
    const [tx, ty]: Coordinates = [
        Math.floor(mazeSize / 2),
        Math.floor(mazeSize / 2),
    ];

    const res: string[] = [];
    const startPos: Array<Coordinates> = [
        [0, 0],
        [0, mazeSize - 1],
        [mazeSize - 1, 0],
        [mazeSize - 1, mazeSize - 1],
    ];

    const getPossibleMoves = (n: number): Array<Coordinates> => [
        [n, 0],
        [0, n],
        [-n, 0],
        [0, -n],
    ];

    const canMove = ([x, y]: Coordinates): boolean => {
        return (
            x >= 0 && x < mazeSize && y >= 0 && y < mazeSize && !visited[x][y]
        );
    };

    const visited = new Array(mazeSize)
        .fill(null)
        .map(() => new Array(mazeSize).fill(false));

    const traverse = ([x, y]: Coordinates, path: string): boolean => {
        if (x === tx && y === ty) {
            res.push(path);
            return true;
        }

        const moves = getPossibleMoves(maze[x][y]);
        for (let i = 0; i < moves.length; i++) {
            const [px, py] = moves[i];
            const [nx, ny] = [x + px, y + py];
            if (canMove([nx, ny])) {
                visited[nx][ny] = true;
                const res = traverse([nx, ny], `${path} (${nx},${ny})`);
                if (res) return res;
                visited[nx][ny] = false;
            }
        }
        return false;
    };

    startPos.forEach((pos) => traverse(pos, `(${pos[0]}, ${pos[1]})`));

    return res;
};

console.log(
    findPathInMaze([
        [3, 5, 4, 4, 7, 3, 4, 6, 3],
        [6, 7, 5, 6, 6, 2, 6, 6, 2],
        [3, 3, 4, 3, 2, 5, 4, 7, 2],
        [6, 5, 5, 1, 2, 3, 6, 5, 6],
        [3, 3, 4, 3, 0, 1, 4, 3, 4],
        [3, 5, 4, 3, 2, 2, 3, 3, 5],
        [3, 5, 4, 3, 2, 6, 4, 4, 3],
        [3, 5, 1, 3, 7, 5, 3, 6, 4],
        [6, 2, 4, 3, 4, 5, 4, 5, 1],
    ])
);
