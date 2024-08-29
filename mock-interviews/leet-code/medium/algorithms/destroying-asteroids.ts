/**
 * You are given an integer mass, which represents the original mass of a planet. You are further given an integer array asteroids, where asteroids[i] is the mass of the ith asteroid.

You can arrange for the planet to collide with the asteroids in any arbitrary order. If the mass of the planet is greater than or equal to the mass of the asteroid, the asteroid is destroyed and the planet gains the mass of the asteroid. Otherwise, the planet is destroyed.

Return true if all asteroids can be destroyed. Otherwise, return false.
 */

function asteroidsDestroyed(mass: number, asteroids: number[]): boolean {
    /**
     * arrange all asteroids that are less planets mass to the start of the array
     * and those that are heavier to the end of the array
     * that way when planet collides with asteroids first will gain all the mass it can.
     *
     *
     *  mass = 10,
     *   [3, 9, 19, 5, 21]
     *   i,c            e
     *   [3, 9, 19, 5, 21]
     *       i,c       e
     *   [3, 9, 19, 5, 21]
     *          i,c     e
     *   [3, 9, 21, 5, 19]
     *          i   c,e
     *   [3, 9, 5, 21, 19]
     *             ie   c
     */

    asteroids.sort((a, b) => a - b);

    return (
        asteroids.reduce((acc, cur) => {
            return cur <= acc ? cur + acc : acc - cur;
        }, mass) >= 0
    );
}

console.log(asteroidsDestroyed(10, [3, 9, 19, 5, 21]));
console.log(asteroidsDestroyed(5, [4, 21, 9, 4]));
