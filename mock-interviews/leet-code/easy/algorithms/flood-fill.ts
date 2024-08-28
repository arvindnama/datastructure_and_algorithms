/**
 * An image is represented by an m x n integer grid image where image[i][j] represents the pixel value of the image.

You are also given three integers sr, sc, and color. You should perform a flood fill on the image starting from the pixel image[sr][sc].

To perform a flood fill, consider the starting pixel, plus any pixels connected 4-directionally to the starting pixel of the same color as the starting pixel, plus any pixels connected 4-directionally to those pixels (also with the same color), and so on. Replace the color of all of the aforementioned pixels with color.
 */

function floodFill(
    image: number[][],
    sr: number,
    sc: number,
    color: number
): number[][] {
    /**
     * for given sr, sc get all possible neighbors that can be colored
     * and check if neighbor is of same color if so color and repeat the same for colored
     * pixel
     */

    if (image[sr][sc] === color) return image;
    const canColor = (r: number, c: number, color: number): boolean =>
        r >= 0 &&
        r < image.length &&
        c >= 0 &&
        c <= image[r].length &&
        image[r][c] === color;

    const neighbors = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];
    const originalColor = image[sr][sc];
    image[sr][sc] = color;
    neighbors.forEach(([r, c]) => {
        const [pr, pc] = [r + sr, c + sc];
        if (canColor(pr, pc, originalColor)) {
            floodFill(image, pr, pc, color);
        }
    });
    return image;
}

console.log(
    floodFill(
        [
            [1, 1, 1],
            [1, 1, 0],
            [1, 0, 1],
        ],
        1,
        1,
        2
    )
);
console.log(
    floodFill(
        [
            [0, 0, 0],
            [0, 0, 0],
        ],
        0,
        0,
        0
    )
);
