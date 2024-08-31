/**
 * Write a function to copy to clipboard
 */

import { JSDOM } from 'jsdom';

const dom = new JSDOM(`
    <!DOCTYPE html>
    <html>
        <body>
            <div class="abc">Test copy to clipboard</div>
        </body>
    </html>
`);

const copyToClipboard = (cssSelector: string): void => {
    /**
     * Get all elements
     */
    const element = dom.window.document.querySelector(cssSelector);
    const range = dom.window.document.createRange();
    range.selectNode(element as Node);
    dom.window.getSelection()?.removeAllRanges(); // clear the selection if any
    dom.window.getSelection()?.addRange(range);
    dom.window.document.execCommand('copy'); // should copy to clip board
    dom.window.getSelection()?.removeAllRanges(); // clear the selection if any
};
copyToClipboard('abc');
