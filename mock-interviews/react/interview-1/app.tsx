/**
 * Build country capital game
 *
 * Functional interviews
 *
 * Implement a component Game that will receive an object data as prop.
 * Each key of the object would be a country and corresponding values would be its capital
 *
 * {
 *  "India": "Delhi",
 *  "Russia": "Moscow",
 * }
 *
 * - Render the list of countries and capital in the random order on the Ui
 * - Ths aim of the game is to select teh country and its capital
 * - The use can select 2 options. The default border color of an option should be #414141
 * - Selected option should have blue color border
 * - if the user selection is correct the selected options border color should change to
 *   #66cc99  & both options should disappear after 1000 ms
 * - if the user selection is incorrect the selected options border should change to red
 *   & reset after 1000 ms
 * - when there are no options left on the screen then show a message congratulations.
 */

import React, {useState, useEffect} from 'react';
import classnames from 'classnames'
import lodashShuffle from 'lodash.shuffle';

import { bootstrapReactApp } from "../../../libs/react/bootstrap";

import './app.css';

const countryCapitalData: Record<string,string>  = {
    'India': 'Delhi',
    'Russia': 'Moscow',
    'China': 'Beijing',
    'England': 'London',
    'USA': 'DC',
    'Germany': 'Berlin',
    'Afganistan': 'Kabul',
}



const Game = (props : {data: Record<string,string>}) => {


    const [options , setOptions] = useState([] as Array<string>)
    const [selectedOptions , setSelectedOptions] = useState([] as Array<string>)
    const [correctOptions , setCorrectOptions] = useState([] as Array<string>)
    const [inCorrectOptions , setInCorrectOptions] = useState([] as Array<string>)
    const [ matchedData, setMatchedData] = useState([] as Array<string>)

    useEffect(() => {
        const allOptions = Object
            .entries(props.data)
            .flat();

        setOptions(lodashShuffle(allOptions))

    },[])

    const onButtonClick = (e: any) => {
        const {target} = e;
        const value: string = target.getAttribute('data-value');

        const newSelectedOptions = [
            ...selectedOptions,
            value
        ]


        if(newSelectedOptions.length <  2) {
            setSelectedOptions(newSelectedOptions)
        } else if(newSelectedOptions.length === 2) {
            // update selected options
            setSelectedOptions(newSelectedOptions);
            const [opt1, opt2] = newSelectedOptions;
            if(props.data[opt1]=== opt2 || props.data[opt2]=== opt1) {
                //is correct selection
                setCorrectOptions(newSelectedOptions);

                // reset selection after 1000 ms and remove from options
                setTimeout(() => {
                    setSelectedOptions([]);
                    setCorrectOptions([]);
                    setMatchedData([
                        ...matchedData,
                        ...newSelectedOptions,
                    ])
                },1000);
            } else {
                // incorrect statements
                setInCorrectOptions(newSelectedOptions);

                // reset the selection after 1000ms
                setTimeout(() => {
                    setSelectedOptions([]);
                    setInCorrectOptions([]);
                },1000);
            }

        }

    }

    return (
        <div className='container'>
            {
                matchedData.length === options.length
                ? <h1> Congratulations</h1>
                : options
                    .filter(option => !matchedData.includes(option))
                    .map((option)=> {
                        const isSelected = selectedOptions.includes(option)
                        const isCorrect = correctOptions.includes(option)
                        const isInCorrect = inCorrectOptions.includes(option)
                        return (
                            <button
                                onClick={onButtonClick}
                                className={classnames(
                                    'option',
                                    isSelected && 'selected',
                                    isCorrect && 'correct',
                                    isInCorrect && 'in-correct'
                                )}
                                key={option}
                                data-value={option}
                            >
                                {option}
                            </button>
                        )
                    })
            }
        </div>
    )
}

const App = () => {
    return (
        <Game data={countryCapitalData}/>
    )
};

bootstrapReactApp(<App/>)
