/**
 * In this UI coding challenge, the candidate needs to build a simple React app where a
 * circle should appear wherever user clicks on the screen.
 * It should support undo and redo operations.
 *
 * Requirements:
 *
 * - A circle should appear where the user clicks on the screen.
 * - The circle should be assigned a random color from the pre-defined list of colors.
 * - The app should support Undo operation that removes the circles in the inverse order of insertion.
 * - The app should support Redo operation that adds the circle back removed via Undo.
 * - The app should support Reset operation that resets the board to its original state.
 * - The controls should be disabled when there is nothing to undo, redo, or reset.
 * - The circles should have fade-in/scale animation upon entering and exiting the screen.
 */

// mockup: [mock-interviews/react/interview-4/images/mockup.png]

import React, { MouseEventHandler, useState } from 'react';

import './app.css';
import { bootstrapReactApp } from '../../../libs/react/bootstrap';
import classnames from 'classnames';

interface Circle {
    x: number;
    y: number;
    color: string;
    id: number;
};


interface IAction {
    text: string;
    hide: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>
}
interface GameState {
    lastCircle: Nullable<Circle>;
    circles: Circle[];
}

const initialState: GameState = {
    lastCircle: null,
    circles: []
}

const colors = [
  '#2c3e50',
  '#34495e',
  '#c0392b',
  '#e74c3c',
  '#27ae60',
  '#3498db',
  '#f39c12',
  '#f1c40f',
];

const Action = ({text, hide, onClick}: IAction) => {
    return (
        <button
            className = {classnames(
                "action"
            )}
            disabled = {hide}
            onClick= {onClick}
        >{text}</button>
    )
}

const Circle = (circle: Omit<Circle, "id">) => {
    return (
        <div
            className="circle"
            style = {{
                left: `${circle.x - 25}px`,
                top: `${circle.y - 25}px`,
                backgroundColor: circle.color
            }}
        ></div>
    )
}

const getRandomColor = (): string => {
    const idx = Math.round((Math.random() * 100)) % (colors.length - 1);
    return colors[idx]
}

const Game = () =>{

    const [state, setState] = useState(initialState)

    const canUndo = state.circles.length > 0;
    const canRedo= state.lastCircle;
    const canReset = state.circles.length > 0;

    const onUndoClick: MouseEventHandler<HTMLButtonElement> = (e) =>{
        setState(prev =>{

            const circles = [...prev.circles]
            const lastCircle = circles.pop()
            return {
                ...prev,
                lastCircle,
                circles,
            }
        })
        e.stopPropagation();
    };

    const onRedoClick: MouseEventHandler<HTMLButtonElement> = (e) =>{

        setState(prev =>{
            return {
                ...prev,
                lastCircle: null,
                circles: [
                    ...prev.circles,
                    prev.lastCircle
                ],
            } as GameState
        })
        e.stopPropagation();
    }
    const onResetClick: MouseEventHandler<HTMLButtonElement> = (e) =>{

        setState(prev =>{
            return {
                ...prev,
                lastCircle: null,
                circles: [],
            } as GameState
        })
        e.stopPropagation();
    }

    const handleBoardClick: MouseEventHandler<HTMLDivElement> = (e) => {

        const circle: Circle = {
            x: e.clientX,
            y: e.clientY,
            color: getRandomColor(),
            id: Date.now()
        }

        setState((prev) => {
            return {
                ...prev,
                circles:[
                    ...prev.circles,
                    circle
                ]
            }
        })
    }


    return (
        <div
            className="gameBoard"
            onClick={handleBoardClick}
        >
            <div className="actionBar">
                <Action text='Undo' hide = {!canUndo} onClick= {onUndoClick}/>
                <Action text='Redo' hide = {!canRedo} onClick= {onRedoClick}/>
                <Action text='Reset' hide = {!canReset} onClick= {onResetClick}/>
            </div>

            <div className="circles">
                {
                    state.circles.map((circle) => {
                        return (
                            <Circle
                                key={circle.id}
                                x={circle.x}
                                y={circle.y}
                                color={circle.color}
                            />
                        )
                    })
                }

            </div>
        </div>
    )
}



const App = () => {
    return (<Game/>)
}

bootstrapReactApp(<App/>)
