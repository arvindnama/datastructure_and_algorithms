/**
 * We are given an array asteroids of integers representing asteroids in a row.

For each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). Each asteroid moves at the same speed.

Find out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode. If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.
 */

function asteroidCollision(asteroids: number[]): number[] {
    /**
     * [5,10,-5]
     * res = [5] cur = 10
     * res = [5, 10] cur = -5
     * res = [5, 10] cur = null
     *
     *
     * [10,2,-5]
     *   res = [10] cur = 2
     *   res = [10, 2] cur = -5
     *   res = [10] cur = -5
     *   res = [10] cur = null
     *
     * [8,-8]
     *
     *   res =[8] cur = -8
     *   res = [] cur = null
     *
     * start with an array containing first asteroid
     *  frm 1 to n asteroids
     *  cur = aster[i]
     *  compare res[res.len -1]  && cur
     *    - both are same sign , no collision --> add cur to res  continue
     *    - both are diff signs,
     *          - if res.len-1 is greater cur explodes so continue i++
     *          - if cur is greater res.len -1 explores , i.e. res.length -=1 cur should remain same
     *          - if same , both explode res.len -=1 & i++
     */

    let i = 0;
    const res = [];

    while (i < asteroids.length) {
        if (res.length === 0) {
            res.push(asteroids[i]);
            i++;
            continue;
        }
        const cur = asteroids[i];
        const prev = res[res.length - 1];
        if (
            (prev > 0 && cur > 0) ||
            (prev < 0 && cur < 0) ||
            (prev < 0 && cur > 0)
        ) {
            // no collision
            res.push(cur);
            i++;
        } else {
            const prevAbs = Math.abs(prev);
            const curAbs = Math.abs(cur);
            // collision
            if (prevAbs === curAbs) {
                // both explode
                res.length -= 1; // prev explodes
                i++; //cur also explodes
            } else if (curAbs > prevAbs) {
                res.length -= 1; // prev explodes
            } else {
                i++; // i explodes
            }
        }
    }

    return res;
}

// console.log(asteroidCollision([5, 10, -5]));
// console.log(asteroidCollision([8, -8]));
// console.log(asteroidCollision([10, 2, -5]));
// console.log(asteroidCollision([5, 2, -5]));
// console.log(asteroidCollision([5, 2, 5]));
// console.log(asteroidCollision([-5, 5]));
// console.log(asteroidCollision([-5, -5]));
// console.log(asteroidCollision([-5, -5, 2, 10]));
console.log(asteroidCollision([1, -2, -2, -2]));
