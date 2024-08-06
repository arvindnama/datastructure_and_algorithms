/**
 * Given a binary matrix, find out the maximum size square sub-matrix with all 1s.
 */

function findMaxSq(arr: number[][]): number {
    /**
     * The idea is to build another array which hold the size of the sq
     * i.e size[][] , where size[i][j] is the size of the square will all 1st in
     * arr with arr[i][j] as bottom most co-ordinate.
     *
     * dynamic programming , use top down apporach
     * start from 0,0 to m,n
     * if arr[i][j] == 0    s[i][j] = 0
     *  if arr[i][j] == 1   s[i][j] = 1 + Min of surrounds top , left , diagonal
     *                       above
     *
     * max value in S[][] will be the max size of the sq will all 1st
     */

    const size: number[][] = Array(arr.length)
        .fill(0)
        .map((_, rIdx) => {
            return new Array(arr[rIdx].length).fill(0);
        });

    const get = (i: number, j: number) => size[i]?.[j] ?? 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] === 1) {
                size[i][j] =
                    1 +
                    Math.min(get(i - 1, j), get(i, j - 1), get(i - 1, j - 1));
            }
        }
    }

    // console.log('sizes', size);
    return size.reduce((acc, cur) => {
        const maxCur = cur.reduce((a, b) => Math.max(a, b), 0);
        return Math.max(acc, maxCur);
    }, 0);
}

console.log(
    findMaxSq([
        [0, 1, 1, 0, 1],
        [1, 1, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0],
    ])
);
