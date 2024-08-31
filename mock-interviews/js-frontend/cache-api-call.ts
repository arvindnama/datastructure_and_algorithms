/**
 * Implement a function in JavaScript that caches the API response for the given amount of time. If a new call is made between that time, the response from the cache will be returned, else a fresh API call will be made.
 */

const cachedApiCall = (cacheTime: number) => {
    const executeApi = (
        url: string,
        config: Record<string, string>
    ): Promise<string> => {
        return new Promise((res) => {
            setTimeout(() => {
                console.log('Making a new API call', getKey(url, config));
                res(getKey(url, config));
            });
        });
    };
    const cache: { [k in string]: Promise<string> } = {};

    const getKey = (url: string, config: Record<string, string>): string => {
        const configKey = Object.keys(config)
            .sort((a, b) => a.localeCompare(b))
            .reduce((acc, cur) => `${acc}&${config[cur].toString()}`, '');

        return `${url}_${configKey}`;
    };

    const clearFromCache = (key: string) => {
        setTimeout(() => {
            console.log('Deleting key', key);
            delete cache[key];
        }, cacheTime);
    };
    return (url: string, config: Record<string, string>): Promise<string> => {
        const key = getKey(url, config);
        if (cache[key] !== undefined) {
            return cache[key];
        }
        cache[key] = executeApi(url, config).then((res) => {
            clearFromCache(key);
            return res;
        });
        return cache[key];
    };
};

const cachedApiFn = cachedApiCall(1000);

cachedApiFn('123', { a: 'a', b: 'b' }).then(console.log);
setTimeout(() => cachedApiFn('123', { a: 'a', b: 'b' }).then(console.log), 500);
setTimeout(() => cachedApiFn('123', { a: 'a', b: 'b' }).then(console.log), 500);
setTimeout(
    () => cachedApiFn('123', { a: 'a', b: 'b' }).then(console.log),
    1010
);
