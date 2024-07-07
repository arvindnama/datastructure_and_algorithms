/**
 *
 * In this question, the candidate needs to create a shape based on a given 2D array.
 * A shape is a collection of empty boxes placed at values that are true in the provided
 * array.
 * Many users have reported that this question was asked in the frontend coding round of
 * companies like Uber.
 *
 * You might be given a 2D array and needs to create the shape and along with
 * interactivity or shape would be created as part of the initial code.
 *
 * Requirements
 * - Create an empty box where array value is 1.
 * - User can select a box. Upon selection the box background color should change t
 *   #0bcc59.
 * - Once all boxes are selected then the boxes should auto-deselect based on the order of
 *   selection.
 * - Deselection should be non-interruptible as in once started, we can't stop it.
 * - During de-selection, user should not be able to select a new box as in disable any
 *   box interaction
 */


import React, { useEffect, useMemo, useState } from 'react';
import classnames from 'classnames';
import { bootstrapReactApp } from '../../../libs/react/bootstrap';

import './app.css';

const boxData = [
  [1, 1, 1],
  [1, 0, 0],
  [1, 1, 1],
];


const Game = ({data}: {data: number[][]}) => {

    const boxes  = useMemo(() => data.flat(), [data])
    const [selectedBoxes , setSelectedBoxes] = useState([] as Array<number>)
    const [unselectInProg , setUnselectInProg] = useState(false)

    const startUnSelecting = () => {

        setSelectedBoxes(prev => {
            const newSelection = [...prev]
            newSelection.shift();
            if(newSelection.length){
                setTimeout(()=>startUnSelecting(),500)
            }else{
                setUnselectInProg(false)
            }
            return newSelection;
        })
    };

    useEffect(() => {
        const visibleBoxesCount = boxes.filter(b => b === 1).length;
        if(visibleBoxesCount === selectedBoxes.length) {
            setUnselectInProg(true)
            setTimeout(() => startUnSelecting() ,100)
        }
    },[selectedBoxes])

    const boxClicked = (boxIdx: number) => {
        if(unselectInProg) {
            return
        }
        const visibleBoxesCount = boxes.filter(b => b === 1).length;

        // if already selected , reject click
        if(selectedBoxes.includes(boxIdx)){
            return;
        }

        const newSelection = [
            ...selectedBoxes,
            boxIdx
        ]

        if(newSelection.length <= visibleBoxesCount) {
            // update selection set
            setSelectedBoxes(newSelection)

        }
    }
    return (
        <div className="container">
            {
                boxes.flat().map((isVisible, boxIdx) => {
                    const isSelected = selectedBoxes.includes(boxIdx)
                    return (
                        <div
                            className = {classnames(
                                "box",
                                !isVisible && "hidden",
                                isVisible && "visible",
                                isSelected && "selected"
                            )}
                            onClick={()=> boxClicked(boxIdx)}
                            key={boxIdx}
                            data-idx={boxIdx}

                        ></div>
                    )
                })
            }
        </div>
    )
}



const App = () =>  (<Game data={boxData}/>)
bootstrapReactApp(<App />)
