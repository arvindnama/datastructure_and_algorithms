/**
 * You are given an integer array matches where matches[i] = [winneri, loseri] indicates that the player winneri defeated player loseri in a match.

Return a list answer of size 2 where:

answer[0] is a list of all players that have not lost any matches.
answer[1] is a list of all players that have lost exactly one match.
The values in the two lists should be returned in increasing order.

Note:

You should only consider the players that have played at least one match.
The testcases will be generated such that no two matches will have the same outcome.
 */

function findWinners(matches: number[][]): number[][] {
    /**
     * record the status in a map
     *  map[i] = {
     *     won : number,
     *     lost: number
     *  }
     */

    const map: { [key in number]: number } = {};
    for (const match of matches) {
        map[match[0]] = map[match[0]] || 0;
        map[match[1]] = map[match[1]] || 0;
        map[match[1]]++;
    }

    const winners = Object.keys(map)
        .filter((player) => map[+player] === 0)
        .map((player) => +player);

    const lostExactlyOnce = Object.keys(map)
        .filter((player) => map[+player] === 1)
        .map((player) => +player);

    return [winners, lostExactlyOnce];
}

console.log(
    findWinners([
        [1, 3],
        [2, 3],
        [3, 6],
        [5, 6],
        [5, 7],
        [4, 5],
        [4, 8],
        [4, 9],
        [10, 4],
        [10, 9],
    ])
);
console.log(
    findWinners([
        [2, 3],
        [1, 3],
        [5, 4],
        [6, 4],
    ])
);
