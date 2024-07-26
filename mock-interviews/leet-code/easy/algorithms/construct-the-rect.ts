/**
 * A web developer needs to know how to design a web page's size. So, given a specific rectangular web page’s area, your job by now is to design a rectangular web page, whose length L and width W satisfy the following requirements:

The area of the rectangular web page you designed must equal to the given target area.
The width W should not be larger than the length L, which means L >= W.
The difference between length L and width W should be as small as possible.
Return an array [L, W] where L and W are the length and width of the web page you designed in sequence.
 */

function constructRectangle(area: number): number[] {
    const allPossible: number[][] = [];
    for (let w = Math.floor(Math.sqrt(area)); w >= 1; w--) {
        const l = Math.floor(area / w);
        if (l * w === area) allPossible.push([l, w]);
    }
    return allPossible.reduce(
        (acc, cur) => {
            const curDiff = cur[0] - cur[1];
            const diff = acc[0] - acc[1];
            acc = curDiff < diff ? cur : acc;
            return acc;
        },
        [Number.MAX_SAFE_INTEGER, 0]
    );
}

console.log(constructRectangle(4));
console.log(constructRectangle(37));
console.log(constructRectangle(122122));
