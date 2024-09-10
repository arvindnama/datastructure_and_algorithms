/**
 * In this question, you need to implement the following code so that when the interviewer calls vDocument.render() then the following HTML structure as a string with proper indentation should be returned.

You can also optionally print the output in the console along with returning it.


const vDocument = new VDocument();
const body = vDocument.createElement("body");
const div = vDocument.createElement("div");

div.innerHTML = "Hello, I am a div!";
body.appendChild(div);
vDocument.appendChild(body);

// proper html structure
const html = vDocument.render();


<html>
	<body>
		<div>
			Hello, I am a div!
		</div>
	</body>
</html>
 */

/**
 * Document ==> VDocument
 * Element ===> VElement
 */

interface IVElement {
    innerHTML: string;
    appendChild(el: IVElement): void;
}

interface IVDocument extends Omit<IVElement, 'innerHTML'> {
    render(): void;
    createElement(tagName: string): IVElement;
}

class VElement implements IVElement {
    innerHTML: string = '';
    children: VElement[] = [];
    constructor(public tagName: string) {}

    appendChild(el: IVElement): void {
        if (!(el instanceof VElement)) {
            throw new Error('Bad input.');
        }
        this.children.push(el);
    }

    render(tabSpace: number = 0): string {
        const printTabs = (c: number) => '\t'.repeat(c);
        const innerElement =
            this.children.length === 0
                ? `${printTabs(tabSpace + 1)}${this.innerHTML}`
                : this.children.map((c) => c.render(tabSpace + 1)).join();

        return (
            printTabs(tabSpace) +
            `<${this.tagName}>` +
            '\n' +
            innerElement +
            '\n' +
            printTabs(tabSpace) +
            `</${this.tagName}>`
        );
    }
}

class VDocument implements IVDocument {
    #root: VElement = new VElement('html');

    appendChild(el: IVElement): void {
        this.#root.appendChild(el);
    }

    createElement(tagName: string): IVElement {
        return new VElement(tagName);
    }

    render(): string {
        return this.#root.render();
    }
}

const vDocument = new VDocument();
const body = vDocument.createElement('body');
const div = vDocument.createElement('div');

div.innerHTML = 'Hello, I am a div!';
body.appendChild(div);
vDocument.appendChild(body);

console.log(vDocument.render());
