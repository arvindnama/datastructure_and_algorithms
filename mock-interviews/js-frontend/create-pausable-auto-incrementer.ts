/**
 * Create a pausable auto incrementer in JavaScript, which takes an initial value and steps as input and increments the initial value with given steps every second. The incrementer can be paused and resumed back.
 */

const createTimer = (
    initialValue: number,
    step: number
): {
    stop: () => void;
    start: () => void;
    reset: () => void;
    getCurVal: () => number;
} => {
    let timer!: NodeJS.Timeout | null;
    let curVal = initialValue;

    const executeTimer = () => {
        if (timer) return; // already running

        timer = setInterval(() => {
            curVal += step;
        }, 1000);
    };

    return {
        start() {
            executeTimer();
        },
        stop() {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
        },
        reset() {
            curVal = initialValue;
        },

        getCurVal() {
            return curVal;
        },
    };
};

const wait = (delay: number) =>
    new Promise((res) => {
        setTimeout(res, delay);
    });

const run = async () => {
    const timer = createTimer(0, 1);
    timer.start();
    await wait(1001);
    console.log(timer.getCurVal()); // 1
    timer.stop();
    await wait(1001);
    console.log(timer.getCurVal()); // 1 should not change
    timer.start();
    await wait(1001);
    console.log(timer.getCurVal()); // 2
    timer.reset();
    await wait(1001);
    console.log(timer.getCurVal()); // 1
    timer.stop();
};

run();
