import './styles.css';

const container = document.body.querySelector('.harness-container');

/**
 * 1 A circle should appear where the user clicks on the screen
 * 2 A circle should assign random colors
 * 3. Undo operation - remove the circle in the inverse order of insertion
 * 4. Redo operation - add circle back that was removed via undo
 *
 * div -> container with boundary where i can listen to click events
 *    on Click:
 *       1. create a div with pos: absolute-> top & left position of the div wrf to
 *          container.
 *       2. store the div in a list or array -> so we can use it for undo
 *       3. store the last operation in prev op for redo .
 */
export const COLORS = [
    '#2c3e50',
    '#34495e',
    '#c0392b',
    '#e74c3c',
    '#27ae60',
    '#3498db',
    '#f39c12',
    '#f1c40f',
];

if (container) {
    container.innerHTML = `
    <div class="game">
      <div class="toolbar">
        <button id="undo">Undo</button>
        <button id="redo">Redo</button>
        <button id="reset">Reset</button>
      </div>
      <div class="container"></div>
    </div>
`;
}

const CIRCLE_DIMENSION = 40;

const getElement = (selector: string): Element | null =>
    document.querySelector(selector);
const getRandomColor = (): string =>
    COLORS[Math.round((Math.random() * 100) % COLORS.length)];

let circles: Element[] = [];
let prevCircle: Element | null = null;

const board = getElement('.container')! as Element;
const undoEl = getElement('#undo')! as HTMLButtonElement;
const redoEl = getElement('#redo')! as HTMLButtonElement;
const resetEl = getElement('#reset')! as HTMLButtonElement;

const createCircle = (e: any) => {
    const { clientX, clientY }: { clientX: number; clientY: number } = e;
    const circleEl = document.createElement('div');
    const color = getRandomColor();

    const { top, left, right, bottom } = board.getBoundingClientRect();

    let circleLeft = clientX - CIRCLE_DIMENSION / 2;
    let circleTop = clientY - CIRCLE_DIMENSION / 2;

    circleLeft = circleLeft < left ? left : circleLeft;
    circleTop = circleTop < top ? top : circleTop;

    circleLeft =
        circleLeft + CIRCLE_DIMENSION < right
            ? circleLeft
            : right - CIRCLE_DIMENSION;
    circleTop =
        circleTop + CIRCLE_DIMENSION < bottom
            ? circleTop
            : bottom - CIRCLE_DIMENSION;

    circleEl.style.left = `${circleLeft}px`;
    circleEl.style.top = `${circleTop}px`;
    circleEl.style.backgroundColor = color;

    circleEl.classList.add('circle');

    circles.push(circleEl);
    board.appendChild(circleEl);
    evaluateButtonState();
};

const undoHandler = () => {
    const circle = circles.pop()!;
    prevCircle = circle;
    circle.remove();
    evaluateButtonState();
};

const redoHandler = () => {
    if (prevCircle) {
        board.appendChild(prevCircle);
        circles.push(prevCircle);
        prevCircle = null;
    }
    evaluateButtonState();
};

const resetHandler = () => {
    circles.forEach((c) => c.remove());
    circles = [];
    evaluateButtonState();
};

const evaluateButtonState = () => {
    const canReset = circles.length > 0;
    const canUndo = circles.length > 0;
    const canRedo = !!prevCircle;

    resetEl.disabled = !canReset;
    undoEl.disabled = !canUndo;
    redoEl.disabled = !canRedo;
};

function main() {
    board.addEventListener('click', createCircle);
    undoEl.addEventListener('click', undoHandler);
    redoEl.addEventListener('click', redoHandler);
    resetEl.addEventListener('click', resetHandler);

    evaluateButtonState();
}

main();
