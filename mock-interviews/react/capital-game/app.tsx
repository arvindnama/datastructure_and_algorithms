import React, { ReactNode, useEffect, useMemo, useState } from 'react';

import { bootstrapReactApp } from '../../../libs/react/bootstrap';

import './app.css';

const classnames = (...args: any[]): string => {
    return args
        .filter((a) => typeof a === 'string')
        .map((a) => a)
        .join(' ');
};
const DATA = {
    India: 'Delhi',
    China: 'Beijing',
    Russia: 'Moscow',
    Afghanistan: 'Kabul',
    France: 'Paris',
    Germany: 'Berlin',
    England: 'London',
};

enum SelectionResult {
    none,
    correct,
    incorrect,
}
const Game = ({
    data,
    children: { whenDone },
}: {
    data: Record<string, string>;
    children: { whenDone: ReactNode };
}) => {
    const list = useMemo(() => {
        return [...Object.keys(data), ...Object.values(data)];
    }, [data]);

    const [items, setItems] = useState<string[]>(list);
    const [itemsSelected, setItemsSelected] = useState<string[]>([]);
    const [selectionResult, setSelectionResult] = useState<SelectionResult>(
        SelectionResult.none
    );

    const onItemClicked = (item: string) => {
        if (itemsSelected.length === 2) {
            // do not allow more than 2 items.
            return;
        }
        setItemsSelected((prev) => [...prev, item]);
    };

    useEffect(() => {
        if (itemsSelected.length === 2) {
            // we need to check if both selects are correct / or wrong
            const isCorrect =
                data[itemsSelected[0]] === itemsSelected[1] ||
                data[itemsSelected[1]] === itemsSelected[0];
            setSelectionResult(
                isCorrect ? SelectionResult.correct : SelectionResult.incorrect
            );

            setTimeout(() => {
                if (isCorrect) {
                    //  I will need to remove from list
                    setItems((prev) => {
                        return prev.filter(
                            (item) => !itemsSelected.includes(item)
                        );
                    });
                }
                setItemsSelected([]);
                setSelectionResult(SelectionResult.none);
            }, 1000);
        }
    }, [itemsSelected]);

    return (
        <div>
            {items.length === 0 && whenDone}
            {items.map((item) => {
                const itemSelected = itemsSelected.includes(item);

                return (
                    <span
                        className={classnames(
                            'item',
                            itemSelected && 'item-selected',
                            itemSelected &&
                                selectionResult === SelectionResult.correct &&
                                'item-success',
                            itemSelected &&
                                selectionResult === SelectionResult.incorrect &&
                                'item-error'
                        )}
                        key={item}
                        onClick={() => onItemClicked(item)}
                    >
                        {item}
                    </span>
                );
            })}
        </div>
    );
};
bootstrapReactApp(
    <Game data={DATA}>
        {{
            whenDone: <h1>Congratulations....</h1>,
        }}
    </Game>
);
