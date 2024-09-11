/* eslint-disable @typescript-eslint/no-this-alias */
/**
 * implement debounce function with trailing & Leading options
 *
 * If trailing is enabled, the debounce will invoke after the delay just like classic implementation.
 * If leading is enabled, it will invoke at the beginning.
 * If both are enabled then it will invoke twice at the beginning and after the delay.
 */

const debounce = (
    func: (...args: any[]) => void,
    wait: number,
    { leading, trailing } = { leading: true, trailing: true }
): ((...args: any[]) => void) => {
    if (!leading && !trailing) throw 'Bad request';
    let timeout!: NodeJS.Timeout | null;

    return (...arg: any[]) => {
        const context = this;
        const invoke = () => func.call(context, ...arg);

        const callNow = leading && !timeout;

        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            timeout = null;
            if (trailing) invoke();
        }, wait);

        if (callNow) invoke();
    };
};

function onMouseMove(e: any) {
    console.log(e.x, e.y);
}

// define the debounced function
const debouncedMouseMove = debounce(onMouseMove, 500, {
    leading: true,
    trailing: true,
});

debouncedMouseMove({ x: 1, y: 1 });
debouncedMouseMove({ x: 2, y: 2 });
debouncedMouseMove({ x: 3, y: 3 });
debouncedMouseMove({ x: 4, y: 4 });
debouncedMouseMove({ x: 5, y: 5 });

setTimeout(() => debouncedMouseMove({ x: 6, y: 6 }), 400);
setTimeout(() => debouncedMouseMove({ x: 7, y: 7 }), 1010);
