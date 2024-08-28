/***
 *
 * Given a function fn, return a memoized version of that function.

A memoized function is a function that will never be called twice with the same inputs. Instead it will return a cached value.

fn can be any function and there are no constraints on what type of values it accepts. Inputs are considered identical if they are === to each other.
 */

type Fn = (...params: any[]) => any;

function memoize(fn: Fn): Fn {
    /**
     * Since we know that 2 params are equal only when there equality check passes.
     * we cannot use flatten the params like params.join()
     * as we will have to use === operator to check for truth ness
     * Hence can use something like Map to store params as `has` function does === equal
     *  check.
     *
     * TO store the params , we can use Map as a tree, were each param is a node.
     *  i.e. param-0 is the stored under root of the cache
     *  param-1 is stored under param-0 and so on .
     * and for a input with 2 params , param-0 & param-1
     *  the tree structure look like :
     * /root --> param-0 ---> param-1 --> result
     *
     * for 3 params with param-0 & param-1 same as above
     *
     *  /root --> param-0 ---> param-1 --> result
     *                                 ---> param-2 ----> result.
     *
     * look up will involve navigating from param-o --> param-n
     * if param-n map is found then  param-n.get('result') will have the cache value.
     *
     *
     * adding to cache.
     *
     * it is possible that few params might already be part of cache with a result.
     *
     * For Ex:
     * call-1:  param-0 , param-1 with result 10
     * now we make another call
     * call-2:  param-0 , param-1, param-2  with result 20
     *
     * cache will look something like
     *
     * /root --> param-0 --> param-1 --> result -->10
     *
     * to add the new call to the cache we will need to navigate down the cache till
     * the common param is reached (param-1) and then start adding the remaining params and
     * result
     * /root --> param-0 --> param-1 --> result -->10
     *                               --> param-2 --> result -->11
     */

    const resultKey = 'RESULT_KEY';

    const cache = new Map<unknown, any>();

    const createResult = (
        paramMap: Map<unknown, any>
    ): { result: unknown; hit: boolean } => {
        const hit = !!paramMap?.has(resultKey);
        const result = hit ? paramMap.get(resultKey) : undefined;
        return { hit, result };
    };
    const lookUp = (params: unknown[]): { result: unknown; hit: boolean } => {
        if (params.length === 0) {
            // check at the root if result available
            return createResult(cache);
        }
        let temp: Map<unknown, any> = cache.get(params[0]);
        for (let i = 1; i < params.length && temp; i++) {
            temp = temp.get(params[i]);
        }
        return createResult(temp);
    };

    const addToCache = (params: unknown[], result: any) => {
        // we need to traverse from root in cache to find the
        // leaf / node until where params[i] matches.
        // once that node is found we need to start creating child nodes
        // until we we reach the end of params.
        // once we are at the leaf , then we insert the result

        if (params.length === 0) {
            // we need to insert the result at root as there are params
            cache.set(resultKey, result);
            return;
        }
        let temp: Map<unknown, any> = cache.get(params[0]);
        if (!temp) {
            // none of params are there under root , we create the first one
            // and add it to cache
            temp = new Map();
            cache.set(params[0], temp);
        }

        let i = 1;
        while (temp && i < params.length) {
            if (temp.has(params[i])) {
                temp = temp.get(params[i]);
                i++;
                continue;
            }
            break; // cache does not have the params, hence break and start adding
        }

        while (i < params.length) {
            const newParamMap = new Map();
            temp.set(params[i], newParamMap);
            temp = newParamMap;
            i++;
        }

        // temp is leaf node , insert result.
        temp.set(resultKey, result);
    };
    return (...args: unknown[]): any => {
        const { hit, result } = lookUp(args);
        if (hit) return result;
        const res = fn(...args);
        addToCache(args, res);
        return res;
    };
}

let callCount = 0;
const memoizedFn = memoize(function (...arr) {
    callCount += 1;
    return arr.reduce((a, b) => a + b, 0);
});
console.group('Call-1');
console.log('result', memoizedFn(1, 1, 1));
console.groupEnd();

console.group('Call-2');
console.log('result', memoizedFn(1, 1));
console.groupEnd();

console.group('Call-3');
console.log('result', memoizedFn(1));
console.groupEnd();

console.group('Call-4');
console.log('result', memoizedFn(1, 1));
console.groupEnd();

console.group('Call-5');
console.log('result', memoizedFn(1, 1, 1));
console.groupEnd();

console.log('total call count', callCount);
