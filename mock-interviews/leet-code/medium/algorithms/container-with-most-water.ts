/**
 * You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.
 */

function maxArea(height: number[]): number {
    /**
     * set 2 pointers one at the start and other at end.
     * compute the same of container between start & end
     *      - area = Min(height[start], height[end]) * (end - start)
     *      - update the global area if it lager than that
     * move the pointer on the side which has min Hight
     */
    let [start, end] = [0, height.length - 1];

    let maxWaterArea = 0;
    while (start < end) {
        const minHeight = Math.min(height[start], height[end]);
        const area = minHeight * (end - start);
        maxWaterArea = Math.max(area, maxWaterArea);
        if (height[start] < height[end]) {
            start++;
        } else {
            end--;
        }
    }
    return maxWaterArea;
}

console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));
console.log(maxArea([1, 1]));
