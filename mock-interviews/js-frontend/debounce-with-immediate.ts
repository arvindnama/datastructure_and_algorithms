/* eslint-disable @typescript-eslint/no-this-alias */
/**
 * In this implementation we will add one extra flag called immediate to execute the function immediately without any further delay.

This flag will be optional which means if it is set to false then the debounce function will behave normally.
 */

const debounce = (
    func: (...args: any[]) => void,
    wait: number,
    immediate = false
): ((...args: any[]) => void) => {
    let timeout!: NodeJS.Timeout | null;

    return (...args: any[]) => {
        const context = this;
        // call now if immediate is true and there nothing waiting
        const callNow = immediate && !timeout;
        if (timeout) clearTimeout(timeout);

        timeout = setTimeout(() => {
            timeout = null;
            if (!immediate) func.call(context, ...args);
        }, wait);

        if (callNow) func.call(context, ...args);
    };
};

function onMouseMove(e: any) {
    console.log(e.x, e.y);
}

// define the debounced function
const debouncedMouseMove = debounce(onMouseMove, 500, true);

debouncedMouseMove({ x: 1, y: 1 });
debouncedMouseMove({ x: 2, y: 2 });
debouncedMouseMove({ x: 3, y: 3 });
debouncedMouseMove({ x: 4, y: 4 });
debouncedMouseMove({ x: 5, y: 5 });

setTimeout(() => debouncedMouseMove({ x: 6, y: 6 }), 400);
setTimeout(() => debouncedMouseMove({ x: 7, y: 7 }), 1010);
