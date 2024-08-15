/**
 * The N Queen is the problem of placing N chess queens on an N×N chessboard so that no two queens attack each other. For example, the following is a solution for 4 Queen problem.
 */

const solveNQueens = (n: number): boolean => {
    const board = new Array(n).fill(null).map(() => new Array(n).fill(0));

    const inRow = (r: number, c: number): boolean => {
        for (let i = 0; i <= r; i++) {
            if (board[i][c] === 1) return true;
        }
        return false;
    };

    const inColumn = (r: number, c: number): boolean => {
        for (let j = 0; j <= c; j++) {
            if (board[r][j] === 1) return true;
        }
        return false;
    };

    const inUpperDiagonal = (r: number, c: number): boolean => {
        for (let i = r, j = c; j >= 0 && i >= 0; i--, j--) {
            if (board[i][j] === 1) return true;
        }
        return false;
    };

    const inLowerDiagonal = (r: number, c: number): boolean => {
        for (let i = r, j = c; j >= 0 && i < n; i++, j--) {
            if (board[i][j] === 1) return true;
        }
        return false;
    };

    const canMove = (r: number, c: number): boolean =>
        !(
            inRow(r, c) ||
            inColumn(r, c) ||
            inUpperDiagonal(r, c) ||
            inLowerDiagonal(r, c)
        );

    const solve = (c: number): boolean => {
        if (c === n) return true;

        for (let r = 0; r < n; r++) {
            if (canMove(r, c)) {
                board[r][c] = 1;
                const res = solve(c + 1);
                if (res) return res;
                board[r][c] = 0;
            }
        }
        return false;
    };

    const res = solve(0);
    console.log(board);
    return res;
};

console.log(solveNQueens(4));
console.log(solveNQueens(8));
