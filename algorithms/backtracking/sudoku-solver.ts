import { Coordinates, Matrix } from '../../models/matrix.models';

function solveSudoku(board: Matrix): Matrix {
    const getStartIdx = (x: number): number => {
        if (x < 3) return 0;
        if (x >= 3 && x < 6) return 3;
        return 6;
    };

    const inBox = ([x, y]: Coordinates, v: number): boolean => {
        const [x1, y1] = [getStartIdx(x), getStartIdx(y)];
        for (let i = x1; i < x1 + 3; i++) {
            for (let j = y1; j < y1 + 3; j++) {
                if (board[i][j] === v) return true;
            }
        }
        return false;
    };

    const inRow = ([x]: Coordinates, v: number): boolean => {
        for (let j = 0; j < board.length; j++) {
            if (board[x][j] === v) return true;
        }
        return false;
    };

    const inColumn = ([, y]: Coordinates, v: number): boolean => {
        for (let i = 0; i < board.length; i++) {
            if (board[i][y] === v) return true;
        }
        return false;
    };

    const canAssignValue = (c: Coordinates, v: number): boolean => {
        return !inBox(c, v) && !inRow(c, v) && !inColumn(c, v);
    };

    const getEmptyBox = (): Coordinates | null => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                if (board[i][j] === 0) return [i, j];
            }
        }
        return null;
    };

    const assignValue = (c: Coordinates | null): boolean => {
        if (c === null) return true;
        for (let v = 1; v <= 9; v++) {
            if (canAssignValue(c, v)) {
                board[c[0]][c[1]] = v;
                const nextCoordinate = getEmptyBox();
                if (assignValue(nextCoordinate)) {
                    return true;
                } else {
                    board[c[0]][c[1]] = 0;
                }
            }
        }
        return false;
    };
    assignValue(getEmptyBox());
    return board;
}

const board = [
    [3, 0, 6, 5, 0, 8, 4, 0, 0],
    [5, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 8, 7, 0, 0, 0, 0, 3, 1],
    [0, 0, 3, 0, 1, 0, 0, 8, 0],
    [9, 0, 0, 8, 6, 3, 0, 0, 5],
    [0, 5, 0, 0, 9, 0, 6, 0, 0],
    [1, 3, 0, 0, 0, 0, 2, 5, 0],
    [0, 0, 0, 0, 0, 0, 0, 7, 4],
    [0, 0, 5, 2, 0, 6, 3, 0, 0],
];

console.log('Board', board);

console.log('Sudoku');
console.log(solveSudoku(board));
