/**
 * Write a class that allows getting and setting key-value pairs, however a time until expiration is associated with each key.

The class has three public methods:

set(key, value, duration): accepts an integer key, an integer value, and a duration in milliseconds. Once the duration has elapsed, the key should be inaccessible. The method should return true if the same un-expired key already exists and false otherwise. Both the value and duration should be overwritten if the key already exists.

get(key): if an un-expired key exists, it should return the associated value. Otherwise it should return -1.

count(): returns the count of un-expired keys.
 */

class TimeLimitedCache {
    private map: {
        [key in number]: { value: number; timer: NodeJS.Timeout | undefined };
    } = {};

    set(key: number, value: number, duration: number): boolean {
        const storedVal = this.map[key];
        const exists = !!storedVal;
        if (storedVal?.timer) {
            clearTimeout(storedVal.timer);
        }
        const timer = setTimeout(() => {
            delete this.map[key];
        }, duration);
        this.map[key] = {
            value,
            timer,
        };

        return exists;
    }

    get(key: number): number {
        return this.map[key]?.value ?? -1;
    }

    count(): number {
        return Object.keys(this.map).length;
    }
}

const timeLimitedCache = new TimeLimitedCache();
console.log(timeLimitedCache.set(1, 42, 50)); // false
console.log(timeLimitedCache.get(1)); // 42
console.log(timeLimitedCache.set(1, 51, 100)); // true
console.log(timeLimitedCache.get(1)); // 51
console.log(timeLimitedCache.count()); // 1
