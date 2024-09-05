/**
 * A company has n employees with a unique ID for each employee from 0 to n - 1. The head of the company is the one with headID.

Each employee has one direct manager given in the manager array where manager[i] is the direct manager of the i-th employee, manager[headID] = -1. Also, it is guaranteed that the subordination relationships have a tree structure.

The head of the company wants to inform all the company employees of an urgent piece of news. He will inform his direct subordinates, and they will inform their subordinates, and so on until all employees know about the urgent news.

The i-th employee needs informTime[i] minutes to inform all of his direct subordinates (i.e., After informTime[i] minutes, all his direct subordinates can start spreading the news).

Return the number of minutes needed to inform all the employees about the urgent news.


 */

function numOfMinutes(
    n: number,
    headID: number,
    manager: number[],
    informTime: number[]
): number {
    const reporteesMap: { [k in number]: number[] } = {};

    for (let i = 0; i < n; i++) {
        if (i === headID) {
            // head so he is the root dont need to assign to any mananger.
            continue;
        }
        reporteesMap[manager[i]] = reporteesMap[manager[i]] || [];
        reporteesMap[manager[i]].push(i);
    }

    const queue: { n: number; timeToConsumeInfo: number }[] = [
        { n: headID, timeToConsumeInfo: 0 },
    ];

    let maxTimeToInformAllEmps = 0;
    while (queue.length) {
        const node = queue.shift() as { n: number; timeToConsumeInfo: number };
        maxTimeToInformAllEmps = Math.max(
            maxTimeToInformAllEmps,
            node.timeToConsumeInfo
        );
        const timeToInform = informTime[node.n];
        const reportees = reporteesMap[node.n] || [];
        for (const reportee of reportees) {
            const timeToConsumeInfo = node.timeToConsumeInfo + timeToInform;
            queue.push({ n: reportee, timeToConsumeInfo });
        }
    }

    return maxTimeToInformAllEmps;
}

console.log(numOfMinutes(1, 0, [-1], [0]));
console.log(numOfMinutes(6, 2, [2, 2, -1, 2, 2, 2], [0, 0, 1, 0, 0, 0]));
console.log(numOfMinutes(7, 2, [1, 2, -1, 2, 1, 3, 0], [4, 2, 2, 3, 0, 0]));
