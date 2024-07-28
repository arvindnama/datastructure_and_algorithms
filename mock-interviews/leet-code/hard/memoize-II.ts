/***
 *
 * Given a function fn, return a memoized version of that function.

A memoized function is a function that will never be called twice with the same inputs. Instead it will return a cached value.

fn can be any function and there are no constraints on what type of values it accepts. Inputs are considered identical if they are === to each other.
 */

type Fn = (...params: any[]) => any;

function memoize(fn: Fn): Fn {
    const CachedResultKey = 'memoize_2_cache_result_key';
    const EmptyParamsKey = 'memoize_2_cache_empty_params_key';

    const map: Map<any, any> = new Map();

    const lookUpInCache = (params: any[]): Map<any, any> | undefined => {
        if (!params.length) return map.get(EmptyParamsKey);
        let nextParamMap = map.get(params[0]);
        for (let i = 1; i < params.length && nextParamMap; i++) {
            if (nextParamMap instanceof Map) {
                nextParamMap = nextParamMap.get(params[i]);
                continue;
            }
            nextParamMap = null;
        }
        return nextParamMap instanceof Map ? nextParamMap : undefined;
    };

    const addToCache = (params: any[], result: any): void => {
        if (!params.length) {
            map.set(EmptyParamsKey, new Map().set(CachedResultKey, result));
            return;
        }
        let nextParamMap = map;

        for (let i = 0; i < params.length; i++) {
            if (!nextParamMap.has(params[i])) {
                nextParamMap.set(params[i], new Map());
            }
            nextParamMap = nextParamMap.get(params[i]);
        }

        nextParamMap.set(CachedResultKey, result);
    };

    return function (...params: any[]) {
        const cache = lookUpInCache(params);

        if (cache instanceof Map && cache.has(CachedResultKey)) {
            // cache hit
            return cache.get(CachedResultKey);
        }
        const result = fn(...params);
        addToCache(params, result);
        return result;
    };
}

let callCount = 0;
const memoizedFn = memoize(function (...arr) {
    callCount += 1;
    return arr.reduce((a, b) => a + b, 0);
});
console.group('Call-1');
console.log('result', memoizedFn());
console.groupEnd();

console.group('Call-2');
console.log('result', memoizedFn(1));
console.groupEnd();

console.group('Call-3');
console.log('result', memoizedFn(1));
console.groupEnd();

console.group('Call-4');
console.log('result', memoizedFn());
console.groupEnd();

console.group('Call-5');
console.log('result', memoizedFn(1, 2));
console.groupEnd();

console.group('Call-6');
console.log('result', memoizedFn(1, 2));
console.groupEnd();

console.log('total call count', callCount);
