/**
 * In this question, you need to implement the following code so that when the interviewer calls vDocument.render() then the following HTML structure as a string with proper indentation should be returned.

You can also optionally print the output in the console along with returning it.
 */

import { v4 as uuidv4 } from 'uuid';

interface IElement {
    innerHTML: string;
    appendChild(el: IElement): void;
    removeChild(el: IElement): void;
}

interface IDocument {
    appendChild(el: IElement): void;
    render(): string;
    createElement(elName: string): IElement;
    removeChild(el: IElement): void;
}

class Document implements IDocument {
    private root: Element = new Element('html');

    public appendChild(el: IElement): void {
        this.root.appendChild(el);
    }
    public render(): string {
        return this.root.render(0);
    }
    public createElement(elName: string): IElement {
        return new Element(elName);
    }
    public removeChild(el: IElement): void {
        return this.root.removeChild(el);
    }
}

class Element implements IElement {
    private id: string = '';
    private parent: Element | null = null;
    private children: Element[] = [];
    #innerHTML: string = '';

    constructor(public name: string) {
        this.id = uuidv4();
    }

    public get innerHTML(): string {
        return this.getInnerHtml();
    }

    public set innerHTML(val: string) {
        this.#innerHTML = val;
    }

    public appendChild(el: IElement): void {
        if (!(el instanceof Element)) {
            throw Error('Invalid Element');
        }
        if (el.parent) {
            throw Error('element cannot have more than one parent');
        }
        el.parent = this;
        this.children.push(el as Element);
    }

    public removeChild(el: IElement): void {
        if (!(el instanceof Element)) {
            throw Error('Invalid Element');
        }
        this.children = this.children.filter((c) => c.id !== el.id);
    }

    public render(intendLevel: number): string {
        const padding = `\t`.repeat(intendLevel);
        const content = `\n\t${this.getInnerHtml(intendLevel + 1)}\n`;
        return `${padding}<${this.name}>${content}${padding}</${this.name}>`;
    }

    private getInnerHtml(intendLevel = 0): string {
        const padding = `\t`.repeat(intendLevel);
        if (this.#innerHTML) return `${padding}${this.#innerHTML}`;

        return this.children
            .map((c) => c.render(intendLevel))
            .reduce((acc, cur) => `${acc}\n${cur}`, '');
    }
}

const dom = new Document();
const body = dom.createElement('body');

const div = dom.createElement('div');
const div2 = dom.createElement('div');
const div3 = dom.createElement('div');
const div4 = dom.createElement('div');
const div5 = dom.createElement('div');
const div6 = dom.createElement('div');

div.innerHTML = 'Hello, I am a div!';
div2.innerHTML = 'Hello, I am a div2!';
div3.innerHTML = 'Hello, I am a div3!';
div5.innerHTML = 'Hello, I am a div5!';
div6.innerHTML = 'Hello, I am a div6!';

div4.appendChild(div5);
div4.appendChild(div6);

body.appendChild(div);
body.appendChild(div2);
body.appendChild(div3);
body.appendChild(div4);

dom.appendChild(body);

// proper html structure
console.log(dom.render());

body.removeChild(div4);

console.log(dom.render());
