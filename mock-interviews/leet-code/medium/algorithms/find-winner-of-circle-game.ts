/**
 * There are n friends that are playing a game. The friends are sitting in a circle and are numbered from 1 to n in clockwise order. More formally, moving clockwise from the ith friend brings you to the (i+1)th friend for 1 <= i < n, and moving clockwise from the nth friend brings you to the 1st friend.

The rules of the game are as follows:

Start at the 1st friend.
Count the next k friends in the clockwise direction including the friend you started at. The counting wraps around the circle and may count some friends more than once.
The last friend you counted leaves the circle and loses the game.
If there is still more than one friend in the circle, go back to step 2 starting from the friend immediately clockwise of the friend who just lost and repeat.
Else, the last friend in the circle wins the game.
Given the number of friends, n, and an integer k, return the winner of the game.
 */

function findTheWinner(n: number, k: number): number {
    /**
     * Create a array of 1..n participants
     * while length > 1 remove one
     */

    const game = new Array(n).fill(null).map((_, i) => i + 1);

    const eliminate = (g: number[], startIdx: number): number => {
        if (g.length === 1) return g[0];

        const idxToRemove = (startIdx + k - 1) % g.length;
        const res = g.filter((_, idx) => idx !== idxToRemove);
        return eliminate(res, idxToRemove);
    };

    return eliminate(game, 0);
}

console.log(findTheWinner(5, 2));
console.log(findTheWinner(6, 5));
