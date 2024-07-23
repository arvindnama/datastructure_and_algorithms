/**
 * In this question, you need to implement a custom mapLimit function that takes 4 arguments

inputs: An array of inputs
limit: The maximum number of operations at any given time.
iterateeFn: The async function that should be called with each input to generate the corresponding output. It will have two arguments:
input: The input being processed
callback: A function that will be called when the input is finished processing. It will be provided with one argument, the processed output.
callback: A function that should be called with the array of outputs once all inputs have been processed.
At any given point, your program can make max 2 calls i.e. at any given point your program can process 1, 2 or 2, 3 or so on user ids.
 */

function getUserById(id: number, callback: (output: string) => void) {
    // simulating async request
    const randomRequestTime = Math.floor(Math.random() * 100) + 200;

    setTimeout(() => {
        callback('User' + id);
    }, randomRequestTime);
}

function mapLimit<T, K>(
    inputs: T[],
    limit: number,
    iterateeFn: (input: T, callback: (output: K) => void) => void,
    callback: (result: K[]) => void
) {
    if (!inputs) callback([]);

    const iterateeFnPromiseWrapper = (input: T) =>
        new Promise<K>((res) => iterateeFn(input, res));

    let result: K[] = [];

    let resumeInputIdx = limit;
    const invoke = (currentInputs: T[]) => {
        currentInputs.forEach((input: T) => {
            console.log('Invoking input', input);
            iterateeFnPromiseWrapper(input)
                .then((res) => {
                    result = result.concat(res);
                    if (resumeInputIdx < inputs.length) {
                        invoke([inputs[resumeInputIdx++]]);
                    } else if (result.length === inputs.length)
                        callback(result);
                })
                .catch(() => {
                    // return what we have so far.
                    callback(result);
                });
        });
    };

    invoke(inputs.slice(0, limit));
}

mapLimit([1, 2, 3, 4, 5], 2, getUserById, (allResults) => {
    console.log('output:', allResults);
    // ["User1", "User2", "User3", "User4", "User5"]
});
