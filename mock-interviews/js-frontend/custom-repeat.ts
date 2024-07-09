/**
 * How to implement String.prototype.repeat? | String Polyfills | Frontend Problem Solving | JavaScript Interview Question
 *
 * Syntax
 * customRepeat(count);
 *
 * count: An integer between 0 and +Infinity,
 *       indicating the number of times to repeat the string.
 *
 *
 *
 */

declare global {
    interface String {
        customRepeat(count: number): string;
    }
}

String.prototype.customRepeat = function (count: number): string {
    const maxLength = 2 ** 29 - 24;
    const maxRepeatableCount = maxLength / (this.length + 1); // +1 for terminating char in string
    if (count < 0 || count > maxRepeatableCount) throw Error('Invalid count');

    const buffer = new Uint8Array(count * this.length);
    for (let i = 0; i < count * this.length; i++) {
        buffer[i] = this.codePointAt(i % this.length) as number;
    }
    const str = new TextDecoder().decode(buffer);
    return str;
};

console.log('mood'.customRepeat(Math.floor((2 ** 29 - 24) / 5)));
