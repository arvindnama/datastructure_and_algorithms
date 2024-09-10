/**
 * A circuit breaker is a design pattern that helps to prevent cascading failures. Falling under the sustainable category, it is majorly used on the micro-services but can be implemented on the front-end side as well.

Imagine you are making an API call and the request keeps failing, rather than keep on bombarding the server, we can halt the request sending for a certain time. That is how a circuit breaker works.
 */

const circuitBreaker = (
    fn: () => string,
    failureCount: number,
    timeThreshold: number
): (() => string) => {
    let attemptsLeft = failureCount;
    const execute = () => {
        let res!: string;
        if (attemptsLeft === 0) {
            // we just need to wait
            console.log('service unavailable');
            return res;
        }
        try {
            res = fn();
        } catch (e) {
            console.log(e);
            // failure we need to reattempt
            attemptsLeft--;
            if (attemptsLeft === 0) {
                setTimeout(() => (attemptsLeft = failureCount), timeThreshold);
            }
        }
        return res;
    };
    return (): string => {
        return execute();
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

const t = testFunction();
const c = circuitBreaker(t, 3, 2000);

console.log(c()); // "error"
console.log(c()); // "error"
console.log(c()); // "error"

console.log('circuit broke', Date.now());
// service is closed for 200 MS
console.log(c()); // "service unavailable"
console.log(c()); // "service unavailable"
console.log(c()); // "service unavailable"
console.log(c()); // "service unavailable"
console.log(c()); // "service unavailable"

console.log('wait for 2000', Date.now());

// service becomes available after 300ms
setTimeout(() => {
    console.log('retry', Date.now());
    console.log(c());
}, 2000); // "hello";
