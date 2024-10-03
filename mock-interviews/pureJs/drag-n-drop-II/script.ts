import './styles.css';

const container = document.body.querySelector('.harness-container');

if (container) {
    container.innerHTML = `
    <div class="container">
        <div class="card">
            <p class="draggable" draggable="true"> P1 </p>
            <p class="draggable" draggable="true"> P2 </p>
            <p class="draggable" draggable="true"> P3 </p>
        </div>
        <div class="card">
            <p class="draggable" draggable="true"> P4 </p>
            <p class="draggable" draggable="true"> P5 </p>
            <p class="draggable" draggable="true"> P6 </p>
        </div>
    </div>
`;
}

/**
 * we can register to dragStart & dragend event on all draggable items.
 *
 * we will need to register to dragOver event on card ==> this is so we can know where
 * to drop it.
 *
 * 1. to differentiate draggable item from dragged item
 *     on dragstart lets added a new class dragged and dragend we can remove
 *    also we can give it some styling if needed.
 */

const queryAll = (selector: string, el?: Element) => {
    const parent = el || document;
    return parent.querySelectorAll(selector);
};

const main = () => {
    const items = queryAll('.draggable');
    const cards = queryAll('.card');

    items.forEach((item) => {
        item.addEventListener('dragstart', () => {
            item.classList.add('dragged');
        });

        item.addEventListener('dragend', () => {
            item.classList.remove('dragged');
        });
    });

    cards.forEach((card) => {
        card.addEventListener('dragover', (e: any) => {
            e.preventDefault();
            const draggedItem = queryAll('.dragged')?.[0];
            const item = findItemBefore(card, e.clientY);
            if (item) {
                card.insertBefore(draggedItem, item);
                return;
            }
            card.appendChild(draggedItem);
        });
    });
};

const findItemBefore = (
    card: Element,
    clientY: number
): Element | undefined => {
    /**
     * here we will need to find where to place the dragged item in card.
     * clientY is the y position of the mouse .
     *
     * we will need to figure which item if any is below the y pos of the mouse.
     *
     * 1. we get all the items inside the card
     * 2. get its mid point location in the card , itemMid = top + height/2
     * 3. offset clientY - itemMid will tell me
     *      < 0 , my mouse is above the current item
     *      > 0 , my mouse is below the mid point.
     *
     * 4. we need to pick only those with offset -ve and pick the once which is closest
     * (if we have 2 item that we are above pick the one that is closes to clientY)
     */

    // If the dragged Item is inside the same card ,then we need to exclude that card.
    const itemsInCard = Array.from(queryAll('.draggable:not(.dragged)', card));

    return itemsInCard.reduce(
        (closestCard, curItem) => {
            const { height, top } = curItem.getBoundingClientRect();
            const midPoint = top + height / 2;

            const offset = clientY - midPoint;

            if (offset < 0 && offset > closestCard.offset) {
                return { offset, item: curItem };
            }
            return closestCard;
        },
        {
            offset: Number.NEGATIVE_INFINITY,
        } as { offset: number; item?: Element }
    ).item;
};

main();

/**
 * Few DOM Apis to remember
 *
 * document.querySelector("") --> css select query from top down
 * element.closest("") ==> will look up element in up the tree from element.
 *
 * element.classList.add()
 * element.classList.remove()
 * element.classList.toggle()
 *
 * element.styles => JS object of styles , where property names are in camelCasing
 * element.dataSet => all data- attribute with props in camelCasing.
 *
 * navigation :
 * element.children => to move down dom tree
 * element.parent => to move up
 * element.nextSibling() > to move left
 * element.previousSibling() to move right
 *
 * element.closest("") to jump to an element above the cur node
 * element.querySelector("") to jump to an element below the cur node
 *
 */
