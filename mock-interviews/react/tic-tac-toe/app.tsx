import React, { useState } from 'react';
import { bootstrapReactApp } from '../../../libs/react/bootstrap';

import './app.css';

/**
 *  Tic Tac Toe:
 *
 * Visual parts:
 *    we need to print a 3 * 3 box inside a container
 *    upon clicking a cell it should fill with players Intials (0 or X)
 *
 * Business logic:
 *     Player-1 vs Player-2:
 *      need to keep track of current player (Player-1 or Player-2)
 *    Every click check if current player is winning and announce.
 *   when all cells are filled end the game
 */

const DEFAULT_BOARD: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
];

enum Player {
    X = 'X',
    O = 'O',
}

enum Status {
    IN_PROGRESS,
    WON,
    TIE,
}

const TicTacToe = () => {
    const [board, setBoard] = useState<string[][]>(DEFAULT_BOARD);
    const [curPlayer, setCurPlayer] = useState<Player>(Player.X);
    const [status, setStatus] = useState<Status>(Status.IN_PROGRESS);

    const getStatus = () => {
        if (status === Status.IN_PROGRESS) {
            return 'Game In Progress';
        } else if (status === Status.TIE) {
            return 'Game Tied';
        }
        return `${curPlayer} Won`;
    };

    const updateStatus = (board: string[][]) => {
        const checkRow = (): boolean => {
            return board.some((row) => row.every((cell) => cell === curPlayer));
        };
        const checkColumn = (): boolean => {
            for (let i = 0; i < 3; i++) {
                let won = true;
                for (let j = 0; j < 3; j++) {
                    won = won && board[j][i] === curPlayer;
                }
                if (won) return won;
            }
            return false;
        };

        const checkDiagonal = (): boolean => {
            let won = true;
            for (let i = 0; i < 3; i++) {
                won = won && board[i][i] === curPlayer;
            }
            return won;
        };

        const checkTie = (): boolean => {
            return board.flat().every((cell) => !!cell);
        };

        const res = checkRow() || checkColumn() || checkDiagonal();
        if (res) {
            setStatus(Status.WON);
        } else if (checkTie()) {
            setStatus(Status.TIE);
        } else {
            // if there is not winner , then set next player
            setCurPlayer((prev) => {
                return prev === Player.O ? Player.X : Player.O;
            });
        }
    };

    const onCellClicked = (rowIdx: number, colIdx: number) => {
        if (status !== Status.IN_PROGRESS) {
            // game over , don't access any updates.
            return;
        }
        if (board[rowIdx][colIdx]) {
            // already set .. do not make any change:
            return;
        }

        setBoard((prev) => {
            const newBoard = prev.map((row, rIdx) => {
                if (rIdx != rowIdx) {
                    // row not changed
                    return row;
                }
                return row.map((cell, cIdx) => {
                    if (cIdx !== colIdx) {
                        // cell not changed
                        return cell;
                    }
                    return curPlayer;
                });
            });
            updateStatus(newBoard);
            return newBoard;
        });
    };

    return (
        <div className="gameboard">
            <div> Current Player: {curPlayer}</div>
            <div className="board">
                {board.map((row, rowIdx) =>
                    row.map((cell, colIdx) => (
                        <div
                            className="box"
                            key={`${rowIdx}_${colIdx}`}
                            onClick={() => onCellClicked(rowIdx, colIdx)}
                        >
                            {cell}
                        </div>
                    ))
                )}
            </div>
            <div> Status:{getStatus()}</div>
        </div>
    );
};

bootstrapReactApp(<TicTacToe />);
