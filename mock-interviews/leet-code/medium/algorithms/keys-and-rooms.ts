/**
 * There are n rooms labeled from 0 to n - 1 and all the rooms are locked except for room 0. Your goal is to visit all the rooms. However, you cannot enter a locked room without having its key.

When you visit a room, you may find a set of distinct keys in it. Each key has a number on it, denoting which room it unlocks, and you can take all of them with you to unlock the other rooms.

Given an array rooms where rooms[i] is the set of keys that you can obtain if you visited room i, return true if you can visit all the rooms, or false otherwise.
 */

function canVisitAllRooms(rooms: number[][]): boolean {
    /**
     * We can perform a BFS starting from room 0 and at the end if any rooms are left
     * unvisited then false.
     *
     * We also need another visited array so we can re-visit already visited room
     */

    const visited: boolean[] = new Array(rooms.length).fill(false);

    const queue: number[] = [0];

    while (queue.length) {
        const room = queue.shift() as number;
        visited[room] = true;
        const roomKeys = rooms[room];
        roomKeys.forEach((roomKey) => {
            if (!visited[roomKey]) queue.push(roomKey);
        });
    }

    return visited.every((room) => room);
}

console.log(canVisitAllRooms([[1], [2], [3], []]));
console.log(canVisitAllRooms([[1, 3], [3, 0, 1], [2], [0]]));
