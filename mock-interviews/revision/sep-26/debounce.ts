 
/**
 * implement debounce function with trailing & Leading options
 *
 * If trailing is enabled, the debounce will invoke after the delay just like classic implementation.
 * If leading is enabled, it will invoke at the beginning.
 * If both are enabled then it will invoke twice at the beginning and after the delay.
 */
const debounce = (
    fn: (...args: any[]) => void,
    wait: number,
    { trailing, leading }: { trailing: boolean; leading: boolean }
): ((...args: any[]) => void) => {
    /**
     * if leading == true , trailing == false
     *    invoke immidiately and for next wait ms dont invoke any
     *
     * if leading == false , trailing == true
     *    wait for wait ms and then invoke
     *
     * * if leading == true , trailing == true
     *    invoke both times.
     *
     * else invalid inputs
     */

    if (!leading && !trailing) throw 'Bad request';

    let timer: NodeJS.Timeout | null = null;

    return (...args: any[]) => {
        const callNow = leading && !timer; // nothing in pending q
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }

        timer = setTimeout(() => {
            timer = null;
            if (trailing) fn(...args);
        }, wait);

        if (callNow) fn(...args);
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
