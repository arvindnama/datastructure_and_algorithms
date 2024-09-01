import React, { useEffect, useState } from 'react';

import { bootstrapReactApp } from '../../../libs/react/bootstrap';

import './app.css';

const Todo = ({ id }: { id: string }) => {
    const [data, setData] = useState({});

    const fetchTodo = async (id: string, abortController: AbortController) => {
        const res = await fetch(
            `https://jsonplaceholder.typicode.com/todos/${id}`,
            {
                signal: abortController.signal,
            }
        );
        return res.json();
    };

    /**
     * Here when the Id changes quiet frequently
     * it will result in multiple Api calls to server.
     * since we are not cancelling the Api request it is possible that
     * old api response might overrite the Ui .
     *
     * This can be solve 2 ways
     *
     * 1. using Abortcontroller:
     *      allows one to generate a signal and any task(fetch) listening to this can cancel
     *       itself upon the signal
     * 2. using a flag in useEffects:
     *      as part of useEffect , we can return a callback that will be called by react
     *      when useEffect is unregistered (i.e.)
     *      we can set a flag in the call and when Api responds if the flag is false ,
     *      we can skip the update --> this is far from ideal but still a solution
     *      ideal is to cancel Api calls.
     */
    useEffect(() => {
        let flag = true;
        const abortController = new AbortController();
        fetchTodo(id, abortController)
            .then((data) => {
                /**
                 * upon cancellation : fetch will not call this call back (Abort Controller)
                 * even if it did , flag will be false and setData wont get triggered.
                 *
                 */
                console.log('todo received', data);
                if (flag) setData(data);
            })
            .catch(() => console.log('aborted'));

        return () => {
            console.log('useffect terminated');
            abortController.abort(); // this will inform fetch to cancel (option-1)
            flag = false; // option-2
        };
    }, [id]);

    return <pre>{JSON.stringify(data, null, 4)}</pre>;
};

const App = () => {
    const [todoId, setTodoId] = useState<number>(1);

    return (
        <div>
            <button onClick={() => setTodoId(todoId + 1)}>Next</button>
            <Todo id={todoId.toString()}></Todo>
        </div>
    );
};
bootstrapReactApp(<App />);
