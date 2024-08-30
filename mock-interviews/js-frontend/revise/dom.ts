/**
 * In this question, you need to implement the following code so that when the interviewer calls vDocument.render() then the following HTML structure as a string with proper indentation should be returned.

You can also optionally print the output in the console along with returning it
 */

interface IVElementAttributes {
    innerHTML: string;
}

interface IVElementActions {
    appendChild(el: IVElement): void;
}

interface IVElementExtendedActions {
    createElement(tag: string): IVElement;
    render(): string;
}

export interface IVElement extends IVElementAttributes, IVElementActions {}

export interface IVDocument
    extends IVElementActions,
        IVElementExtendedActions {}

class VElement
    implements IVElement, IVElementExtendedActions, IVElementActions
{
    #children: VElement[] = [];

    public innerHTML: string = '';

    public constructor(private tag: string) {}

    public appendChild(el: IVElement): void {
        if (!(el instanceof VElement)) {
            throw 'invalid Element, use Document.createElement to create element';
        }
        this.#children.push(el);
    }

    public createElement(tag: string): IVElement {
        return new VElement(tag);
    }

    private renderFormatted(tabs: number): string {
        const printTabs = (c: number) => '\t'.repeat(c);
        const innerElement = this.innerHTML
            ? `${printTabs(tabs + 1)}${this.innerHTML}`
            : this.#children
                  .map((c) => `${c.renderFormatted(tabs + 1)}`)
                  .join('\n');
        return (
            printTabs(tabs) +
            `<${this.tag}>\n` +
            innerElement +
            `\n` +
            printTabs(tabs) +
            `</${this.tag}>`
        );
    }

    public render(): string {
        return this.renderFormatted(0);
    }
}

export class VDocument extends VElement {
    public constructor() {
        super('html');
    }
}

const vDocument = new VDocument();
const body = vDocument.createElement('body');
const div = vDocument.createElement('div');

div.innerHTML = 'Hello, I am a div!';
body.appendChild(div);
vDocument.appendChild(body);

// proper html structure
const html = vDocument.render();
console.log(html);
