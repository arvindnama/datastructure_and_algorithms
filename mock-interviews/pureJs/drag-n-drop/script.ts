import './styles.css';

const container = document.body.querySelector('.harness-container');

if (container) {
    container.innerHTML = `
    <div class="host">
        <div class="container">
            <p class="draggable" draggable=true>1</p>
            <p class="draggable" draggable=true>2</p>
        </div>

        <div class="container">
            <p class="draggable" draggable=true>3</p>
            <p class="draggable" draggable=true>4</p>
        </div>
    </div>
`;
}

/**
 * mark the draggable elements with class draggable and set html attribute
 * draggable to true.
 *
 * we need to list to drag start and drag end events on draggable elements
 * and for the sake of identification add a classname called dragged.
 * this will help us
 *  1. style the dragged element
 *  2. query the dragged element when needed (like in target)
 *
 * query for all container where the items can be dropped and attach an
 * event lister for dragover -> this will be raised when item is dragged over that
 * element.
 *
 * Iteration-1: drag and drop -> add the item at the end
 *   1. on the dragover event handler of the container (target)
 *   2. query for the dragged item and add that item to container at end.
 *
 * Iteration-2: figure out the order where we need to insert the item.
 *
 */

const query = (selector: string): Element[] =>
    Array.from(document.querySelectorAll(selector));
const queryOnElement = (selector: string, element: Element): Element[] =>
    Array.from(element.querySelectorAll(selector));

const draggableItems = query('.draggable');
const containers = query('.container');

draggableItems.forEach((draggable) => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragged');
    });

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragged');
    });
});

containers.forEach((container) => {
    container.addEventListener('dragover', (e: any) => {
        e.preventDefault();
        const mouseY = e.clientY;
        const draggedItem = query('.dragged')[0];
        const item = getItemAfterY(container, mouseY);
        if (!item) {
            // add to the end of the list and the mouseY is way below
            // all items.
            container.appendChild(draggedItem);
            return;
        }
        container.insertBefore(draggedItem, item);
    });
});

function getItemAfterY(container: Element, y: number): Element | undefined {
    const itemsInContainer = queryOnElement(
        '.draggable:not(.dragged)',
        container
    );

    return itemsInContainer.reduce(
        (closest, child) => {
            const box = child.getBoundingClientRect();
            const midPoint = box.top + box.height / 2;

            const offset = y - midPoint;

            /**
             * if mouseY is above this child , then offset will be -ve
             * else positive
             * we need only those child that are below mouseY
             *
             * offset needs to be -ve and offset should be smaller than any other
             * in the list.
             */

            if (offset < 0 && offset > closest.offset) {
                return { offset, element: child };
            }
            return closest;
        },
        {
            offset: Number.NEGATIVE_INFINITY,
        } as { offset: number; element?: Element }
    ).element;
}
