import { TreeNode, createTree } from '../../models/tree.models';

const check = (t1: TreeNode<string>, t2: TreeNode<string>): boolean => {
    const traverse = (t: TreeNode<string>): string[][] => {
        const queue: Array<{ node: TreeNode<string>; level: number }> = [
            { node: t, level: 0 },
        ];

        const res: string[][] = [];
        while (queue.length) {
            const n = queue.shift() as {
                node: TreeNode<string>;
                level: number;
            };
            res[n.level] = res[n.level] || [];
            res[n.level].push(n.node.value);

            if (n.node.left)
                queue.push({ node: n.node.left, level: n.level + 1 });
            if (n.node.right)
                queue.push({ node: n.node.right, level: n.level + 1 });
        }
        return res;
    };

    const isAnagram = (t1: string[], t2: string[]): boolean => {
        if (t1.length !== t2.length) return false;
        const map1: { [key in string]: number } = {};
        const map2: { [key in string]: number } = {};
        for (let i = 0; i < t2.length; i++) {
            map1[t1[i]] = (map1[t1[i]] || 0) + 1;
            map2[t2[i]] = (map2[t2[i]] || 0) + 1;
        }

        if (Object.keys(map1).length !== Object.keys(map2).length) return false;

        return Object.keys(map1).every((k) => map1[k] == map2[k]);
    };

    const t1byLevel = traverse(t1);
    const t2byLevel = traverse(t2);

    if (t1byLevel.length !== t2byLevel.length) return false;

    let res = true;
    for (let level = 0; res && level < t1byLevel.length; level++) {
        res = isAnagram(t1byLevel[level], t2byLevel[level]);
    }
    return res;
};

let [t1, t2] = [
    createTree(['1', '3', '2', null, null, '5', '4']) as TreeNode<string>,
    createTree(['1', '2', '3', '4', '5']) as TreeNode<string>,
];

console.log('Are 2 trees anagram', check(t1, t2));

[t1, t2] = [
    createTree(['1', '3', '2', null, null, '5', '4']) as TreeNode<string>,
    createTree(['1', '2', '3', '4', '6']) as TreeNode<string>,
];

console.log('Are 2 trees anagram', check(t1, t2));
