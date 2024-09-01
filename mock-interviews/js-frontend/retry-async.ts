/**
 * Implement a function in JavaScript that retries promises N number of times with a delay between each call.
 *
 *
retry(asyncFn, retries = 3, delay = 50, finalError = 'Failed');
 */

const retry = (
    asyncOperation: () => Promise<unknown>,
    retries: number,
    delay: number,
    finalErr = 'Retry failed'
): Promise<unknown> => {
    const execute = async (
        resolve: (value: unknown) => void,
        reject: (reason?: any) => void,
        firstCall: boolean = true
    ) => {
        try {
            if (retries > 0 || firstCall) {
                const res = await asyncOperation();
                resolve(res);
            } else {
                reject(finalErr);
            }
        } catch {
            setTimeout(() => {
                console.log('retring now...');
                retries--;
                execute(resolve, reject, false);
            }, delay);
        }
    };

    return new Promise((res, rej) => {
        execute(res, rej);
    });
};

// Test function
const getTestFunc = () => {
    let callCounter = 0;
    return async () => {
        callCounter += 1;
        // if called less than 5 times
        // throw error
        if (callCounter < 5) {
            throw new Error('Not yet');
        }
    };
};

// Test the code
const test = async () => {
    await retry(getTestFunc() as any, 10, 100);
    console.log('success');
    await retry(getTestFunc() as any, 3, 100);
    console.log('will fail before getting here');
};

// Print the result
test().catch(console.error);
