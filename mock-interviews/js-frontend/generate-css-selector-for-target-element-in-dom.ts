/**
 * How to generate CSS selector for the target element? | Frontend Interview Question |
 * Advanced JavaScript
 *
 * Given a valid DOM tree and a target element, generate a valid selector to target it.

<div>
    <h1>Devtools Tech</h1>
    <div>
        <p>Subscribe to our YT channel </p>
        <a href="youtube.com/c/devtoolstech">here</a>
    </div>
</div>

// selecting anchor
const selector = generateSelector(root, target);
console.log(selector); // div > div > a

<section>
    <ul>
        <li>Home</li>
        <li>Services</li>
        <li>Product</li>
    </ul>
</section>

// selecting li with text Product
const selector = generateSelector(root, target);
console.log(selector); // section > ul > li:nth-of-type(3)
 */

import { JSDOM } from 'jsdom';

function generateSelector(root: HTMLElement, target: HTMLElement) {
    /**
     * first we will need to get the path of the target element from root
     * when we have the path we can construct a simple selector
     *
     * - we will need to also keep if the parent has more than one children of same type
     *   we need to keep track of the child index to construct the path.
     *
     * we can adopt BFS/DFS for finding the path from root to target
     *  i will use BFS as it is easy to navigate without recursion.
     *  as I am traversing I will keep track of the path (along with childIdx and if there
     *  are more than one element of same type in parent element)
     */

    type QueueItem = {
        node: HTMLElement;
        path: string[];
    };
    const queue: QueueItem[] = [{ node: root, path: [root.tagName] }];

    while (queue.length) {
        const item = queue.shift()!;

        if (item.node === target) {
            // we found our target. construct the path and return the selector
            return item.path.map((p) => p.toLowerCase()).join(' > ');
        }
        const childrenMap = Array.from(item.node.children).reduce(
            (acc, cur) => {
                acc[cur.tagName] = acc[cur.tagName] || [];
                acc[cur.tagName].push(cur as HTMLElement);
                return acc;
            },
            {} as { [tag: string]: HTMLElement[] }
        );

        Object.keys(childrenMap).forEach((tagName) => {
            const childrenOfKind = childrenMap[tagName];

            for (let i = 0; i < childrenOfKind.length; i++) {
                const child = childrenOfKind[i];
                const path =
                    childrenOfKind.length === 1
                        ? tagName
                        : `${tagName}:nth-of-type(${i + 1})`;
                queue.push({ node: child, path: [...item.path, path] });
            }
        });
    }
    return '';
}

let dom = new JSDOM(`
    <!DOCTYPE html>
    <html>
        <body>
            <div id="root">
                <h1>Devtools Tech</h1>
                <h1>Devtools Tech2</h1>
                <div>
                    <p>Subscribe to our YT channel </p>
                    <a id="target" href="youtube.com/c/devtoolstech">here</a>
                </div>
            </div>
        </body>
    </html>
`);

let root = dom.window.document.querySelector('#root') as HTMLElement;
let target = dom.window.document.querySelector('#target') as HTMLElement;
console.log(generateSelector(root, target));

dom = new JSDOM(`
    <!DOCTYPE html>
    <html>
        <body>
            <section id="root">
                <ul>
                    <li>Home</li>
                    <li>Services</li>
                    <li id="target">Product</li>
                </ul>
            </section>
        </body>
    </html>
`);

root = dom.window.document.querySelector('#root') as HTMLElement;
target = dom.window.document.querySelector('#target') as HTMLElement;
console.log(generateSelector(root, target));
