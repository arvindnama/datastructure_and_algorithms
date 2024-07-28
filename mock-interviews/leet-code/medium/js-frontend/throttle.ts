type F = (...args: unknown[]) => void;

const throttle = (fn: F, delay: number): F => {
    let timer: NodeJS.Timeout | undefined;

    return (...args: unknown[]) => {
        if (!timer) {
            fn(...args);
            timer = setTimeout(() => {
                clearTimeout(timer);
                timer = undefined;
            }, delay);
        }
    };
};

const log = throttle(console.log, 100);

log('Hello1'); // Logged
log('Hello2'); // cancelled
log('HelloWorld'); // cancelled
setTimeout(() => log('Hello never'), 50);
setTimeout(() => log('Hello again'), 101);
