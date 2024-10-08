/**
 * Enhance all functions to have the callPolyfill method. The method accepts an object obj as it's first parameter and any number of additional arguments. The obj becomes the this context for the function. The additional arguments are passed to the function (that the callPolyfill method belongs on).

For example if you had the function:

function tax(price, taxRate) {
  const totalCost = price * (1 + taxRate);
  console.log(`The cost of ${this.item} is ${totalCost}`);
}
Calling this function like tax(10, 0.1) will log "The cost of undefined is 11". This is because the this context was not defined.

However, calling the function like tax.callPolyfill({item: "salad"}, 10, 0.1) will log "The cost of salad is 11". The this context was appropriately set, and the function logged an appropriate output.

Please solve this without using the built-in Function.call method.
 */

import { JSONValue } from '../../../../models/leet-code.models';

declare global {
    interface Function {
        callPolyfill(
            context: Record<string, JSONValue>,
            ...args: JSONValue[]
        ): JSONValue;
    }
}

Function.prototype.callPolyfill = function (
    context: any,
    ...args: any[]
): JSONValue {
    const fn = this.bind(context);
    return fn(...args);
};
