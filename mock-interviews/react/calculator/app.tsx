import React, { useState } from 'react';
import { bootstrapReactApp } from '../../../libs/react/bootstrap';

import './app.css';

const InvalidExpression = 'invalid expression';
const KeyBoard: string[][] = [
    ['%', 'C', '<', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '', '='],
];

const Calculator = () => {
    const isNum = (key: string): boolean => {
        return !!/^[0-9]*$/.exec(key) || key === '.';
    };

    const evaluate = (expression: string): string => {
        const parts = expression.split(' ');
        console.log(expression, parts);
        let res: string | number = parts[0];
        for (let i = 1; i < parts.length; i += 2) {
            if (typeof res === 'string' && !isNum(res)) {
                console.log(res, typeof res, isNum(res));
                return InvalidExpression;
            }

            res = parseInt(res.toString());
            const [op, operand2] = [parts[i], parts?.[i + 1] ?? ''];
            if (!(op && operand2) && isNum(operand2)) {
                return InvalidExpression;
            }
            switch (op) {
                case '+':
                    res += parseInt(operand2);
                    continue;
                case '-':
                    res -= parseInt(operand2);
                    continue;
                case '*':
                    res *= parseInt(operand2);
                    continue;
                case '/':
                    res /= parseInt(operand2);
                    continue;
                case '%':
                    res %= parseInt(operand2);
                    continue;
            }
        }
        return res.toString();
    };
    const onKeyPadClicked = (key: string) => {
        if (key === '') return;
        setDisplay((prev) => {
            if (prev === InvalidExpression) {
                // if display is showing invalid expression , auto clear
                // on any keypress
                prev = '';
            }
            if (key === '=') {
                return evaluate(display);
            }
            if (key === 'C') {
                return '';
            }
            if (key === '<') {
                return prev.slice(0, prev.length - 1).trim();
            }
            const lastKey = prev[prev.length - 1];
            const space = isNum(lastKey) && isNum(key) ? '' : ' ';
            return `${prev}${space}${key}`.trim();
        });
    };

    const [display, setDisplay] = useState<string>('');
    return (
        <div className="calculator">
            <h1>Calculator</h1>
            <textarea
                className="display"
                readOnly={true}
                value={display}
            ></textarea>
            <div className="keypad">
                {KeyBoard.flat().map((key) => (
                    <div
                        className="cell"
                        key={key}
                        onClick={() => onKeyPadClicked(key)}
                    >
                        {key}
                    </div>
                ))}
            </div>
        </div>
    );
};

bootstrapReactApp(<Calculator />);
