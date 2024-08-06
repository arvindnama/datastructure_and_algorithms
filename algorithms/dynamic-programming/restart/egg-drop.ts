/***
 *
 *
 * The following is a description of the instance of this famous puzzle involving N = 2 eggs and a building with K = 36 floors.
Suppose that we wish to know which stories in a 36-story building are safe to drop eggs from, and which will cause the eggs to break on landing. We make a few assumptions:

An egg that survives a fall can be used again.
A broken egg must be discarded.
The effect of a fall is the same for all eggs.
If an egg breaks when dropped, then it would break if dropped from a higher floor.
If an egg survives a fall then it would survive a shorter fall.
It is not ruled out that the first-floor windows break eggs, nor is it ruled out that the 36th-floor does not cause an egg to break.
If only one egg is available and we wish to be sure of obtaining the right result, the experiment can be carried out in only one way. Drop the egg from the first-floor window; if it survives, drop it from the second-floor window. Continue upward until it breaks. In the worst case, this method may require 36 droppings. Suppose 2 eggs are available. What is the least number of egg droppings that are guaranteed to work in all cases?


* The problem is not actually to find the critical floor, but merely to decide floors from
which eggs should be dropped so that the total number of trials is minimized.


https://www.geeksforgeeks.org/egg-dropping-puzzle-dp-11/?ref=lbp


 */

function findMinTrialsNeededInWorstCase(n: number, k: number): number {
    /**
     * At any floor X , there are 2 possibilities
     *  1. it can break
     *      if so, we need to test floor below so we have n -1 and k -1 flrs to test.
     *  2. it will not break
     *      then we need to move up to find a floor where it break , we have n eggs and
     *      k -x floor to test.
     *   Since we need to worst case for a given floor the trials is 1 + Max of above two.
     * Since we need find a floor who's trials are min , it is min of trials of all floors.
     */
    const map: { [k in string]: number } = {};

    const eggDrop = (n: number, k: number): number => {
        if (k === 0 || k === 1) return k;
        if (n === 1) return k;

        const key = `${n}_${k}`;
        if (map[key]) return map[key];

        let minTrials = Number.MAX_VALUE;
        for (let x = 1; x <= k; x++) {
            const worstCaseTrialsForX =
                1 + Math.max(eggDrop(n - 1, x - 1), eggDrop(n, x - k));
            minTrials = Math.min(minTrials, worstCaseTrialsForX);
        }

        return (map[key] = minTrials);
    };
    return eggDrop(n, k);
}

console.log(findMinTrialsNeededInWorstCase(2, 10));
console.log(findMinTrialsNeededInWorstCase(1, 2));
