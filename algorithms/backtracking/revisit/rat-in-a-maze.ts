/**
 * Consider a rat placed at (0, 0) in a square matrix of order N * N. It has to reach the destination at (N – 1, N – 1). Find all possible paths that the rat can take to reach from source to destination. The directions in which the rat can move are ‘U'(up), ‘D'(down), ‘L’ (left), ‘R’ (right). Value 0 at a cell in the matrix represents that it is blocked and rat cannot move to it while value 1 at a cell in the matrix represents that rat can be travel through it. Return the list of paths in lexicographically increasing order.
Note: In a path, no cell can be visited more than one time. If the source cell is 0, the rat cannot move to any other cell.
 */

const solveRatInAMaze = (maze: number[][]): string[] => {
    const n = maze.length;
    const visited = Array(n)
        .fill(null)
        .map(() => new Array(n).fill(0));
    const path: string[] = [];

    const moves: Array<[number, number, string]> = [
        [-1, 0, 'u'],
        [1, 0, 'd'],
        [0, -1, 'l'],
        [0, 1, 'r'],
    ];

    const canMove = (r: number, c: number): boolean => {
        return (
            r >= 0 &&
            c >= 0 &&
            r < n &&
            c < n &&
            maze[r][c] === 1 &&
            visited[r][c] === 0
        );
    };

    const solve = (i: number, j: number, tempPath: string) => {
        if (i === maze.length - 1 && j === maze.length - 1) {
            path.push(tempPath);
            return;
        }

        for (let m = 0; m < moves.length; m++) {
            const [r, c, d] = moves[m];
            if (canMove(i + r, j + c)) {
                visited[i + r][j + c] = 1;
                solve(i + r, j + c, `${tempPath ? `${tempPath}-->` : ''}${d}`);
                visited[i + r][j + c] = 0;
            }
        }
    };
    visited[0][0] = 1;
    solve(0, 0, '');
    return path;
};

console.log(
    solveRatInAMaze([
        [1, 0, 0, 0],
        [1, 1, 0, 1],
        [1, 1, 0, 0],
        [0, 1, 1, 1],
    ])
);
