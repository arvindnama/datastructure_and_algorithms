/**
 * You have a long flowerbed in which some of the plots are planted, and some are not. However, flowers cannot be planted in adjacent plots.

Given an integer array flowerbed containing 0's and 1's, where 0 means empty and 1 means not empty, and an integer n, return true if n new flowers can be planted in the flowerbed without violating the no-adjacent-flowers rule and false otherwise.


 */

function canPlaceFlowers(flowerbed: number[], n: number): boolean {
    /**
     * single pointer approach , while n is > 0 or pointer has not reached end
     * at every point check if you can we can place flowers in that pot (pot[i] == 0 && pot[i-1] == 0 && pot?.[i - 1] ?? 0 === 0)
     *   if yes , n--, flowerbed[i] = 1, i+=2
     *   if no i++;
     */

    let i = 0;
    while (n > 0 && i < flowerbed.length) {
        if (
            flowerbed[i] === 0 &&
            (flowerbed?.[i + 1] ?? 0) === 0 &&
            (flowerbed?.[i - 1] ?? 0) === 0
        ) {
            flowerbed[i] = 1;
            n--;
            i += 2;
            continue;
        }
        i++;
    }

    return n === 0;
}

console.log(canPlaceFlowers([1, 0, 0, 0, 1], 1));
console.log(canPlaceFlowers([1, 0, 0, 0, 1], 2));
console.log(canPlaceFlowers([1, 0, 0, 0, 0, 0, 1], 2));
console.log(canPlaceFlowers([1, 0, 0, 0, 1, 0, 0], 2));
