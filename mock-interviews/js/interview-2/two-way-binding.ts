/**
 * Create a model function (stat, element) to bind state.value to HTMLInputElement.
 *
 * Usage::
 * const input = document.createElement('input');
 * const state = {value: 'hi'}
 *
 * model(state,input)
 *
 * console.log(input.value) // hi
 *
 * state.value = 'dev'
 * console.log(input.value) // dev
 *
 * input.val = 'test'
 * input.dispatchEvent(new Event('change'))
 * console.log(state.value) // test
 */

const model = (state: { value: string }, input: HTMLInputElement): void => {
    // set initial value of state to the input
    input.value = state.value;
    Object.defineProperty(state, 'value', {
        get: (): string => {
            return input.value;
        },
        set: (val: string): void => {
            input.value = val;
        },
    });

    // subscribe for any changes from input and update state

    input.addEventListener('change', (e: Event) => {
        const input = e.target as HTMLInputElement;
        state.value = input.value;
    });
};

// Test code::

import { JSDOM } from 'jsdom';

const dom = new JSDOM(`
    <!DOCTYPE html>
    <html>
        <body>
        </body>
    </html>
`);
const input = dom.window.document.createElement('input');
dom.window.document.body.append(input);

const state = { value: 'hi' };
model(state, input);

console.log('input element initial value is `hi`::', input.value); // hi

state.value = 'dev';
console.log(
    'input element value when state.value is modified to `dev` :: ',
    input.value
); // dev

input.value = 'test';
input.dispatchEvent(new dom.window.Event('change'));
console.log(
    'value of state object when input element is modified to `test` :: ',
    state.value
); // test
