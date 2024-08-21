/**
 * A circuit breaker is a design pattern that helps to prevent cascading failures. Falling under the sustainable category, it is majorly used on the micro-services but can be implemented on the front-end side as well.
 */

const circuitBreaker = (
    fn: (...args: unknown[]) => unknown,
    failureCount: number,
    timeThreshold: number
): ((...args: unknown[]) => unknown) => {
    let count = 0;
    let lastFailedCall: number = -1;
    return (...args: unknown[]): unknown => {
        if (
            lastFailedCall &&
            Date.now() - lastFailedCall < timeThreshold &&
            count === failureCount
        ) {
            // circuit break scenario
            console.log(Date.now(), 'service unavailable');
            return;
        }

        try {
            const res = fn(...args);
            lastFailedCall = -1;
            count = 0;
            return res;
        } catch (e) {
            console.log(Date.now(), e);
            count++;
            lastFailedCall = Date.now();
        }
    };
};

// test function
const testFunction = () => {
    let count = 0;

    return function () {
        count++;
        if (count < 4) {
            throw 'failed';
        } else {
            return 'hello';
        }
    };
};

const c = circuitBreaker(testFunction(), 3, 200);

c(); // "error"
c(); // "error"
c(); // "error"

// service is closed for 200 MS

c(); // "service unavailable"
c(); // "service unavailable"
c(); // "service unavailable"
c(); // "service unavailable"
c(); // "service unavailable"

// service becomes available after 300ms
setTimeout(() => {
    c(); // "service unavailable";
}, 190);

setTimeout(() => {
    console.log(Date.now(), c());
}, 300); // "hello";
