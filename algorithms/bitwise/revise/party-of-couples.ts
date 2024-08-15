/**
 * You are given an integer array arr[] of size n, representing n number of people in a party, each person is denoted by an integer. Couples are represented by the same number ie: two people have the same integer value, it means they are a couple. Find out the only single person in the party of couples.

NOTE: It is guarantee that there exist only one single person in the party.
 */

const findSingle = (arr: number[], n: number): number => {
    n = n + 1; // total no. if all had a partner.
    let total = 0;
    let partyTotal = 0;
    for (let i = 1; i <= n / 2; i++) total += i * 2;
    for (let i = 0; i < arr.length; i++) partyTotal += arr[i];

    return total - partyTotal;
};

console.log(findSingle([1, 2, 3, 2, 1], 5));
console.log(findSingle([1, 2, 3, 5, 3, 2, 1, 4, 5, 6, 6], 11));
