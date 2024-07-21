/**
 * You are given an integer array score of size n, where score[i] is the score of the ith athlete in a competition. All the scores are guaranteed to be unique.

The athletes are placed based on their scores, where the 1st place athlete has the highest score, the 2nd place athlete has the 2nd highest score, and so on. The placement of each athlete determines their rank:

The 1st place athlete's rank is "Gold Medal".
The 2nd place athlete's rank is "Silver Medal".
The 3rd place athlete's rank is "Bronze Medal".
For the 4th place to the nth place athlete, their rank is their placement number (i.e., the xth place athlete's rank is "x").
Return an array answer of size n where answer[i] is the rank of the ith athlete.
 */

function findRelativeRanks(score: number[]): string[] {
    return Array(score.length)
        .fill(null)
        .map((_, i) => i)
        .sort((a, b) => score[b] - score[a])
        .reduce((acc, athleteIdx, rank) => {
            let rankStr = `${rank + 1}`;
            if (rank === 0) rankStr = 'Gold Medal';
            else if (rank === 1) rankStr = 'Silver Medal';
            else if (rank === 2) rankStr = 'Bronze Medal';

            acc[athleteIdx] = rankStr;
            return acc;
        }, [] as string[]);
}

console.log(findRelativeRanks([10, 3, 8, 9, 4]));
console.log(findRelativeRanks([5,4,3,2,1]));
