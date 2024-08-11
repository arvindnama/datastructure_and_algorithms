/**
 * We are given a Trie with a set of strings stored in it.
 * Now the user types in a prefix of his search query,
 * we need to give him all recommendations to auto-complete his query based on the strings stored in the Trie.
 */

import { Trie, TrieNode } from '../../../../../models/trie.models';

const autocomplete = (trie: Trie, str: string): string[] => {
    str = str.trimStart().trimEnd();
    const findEnd = (root: TrieNode): Nullable<TrieNode> => {
        const keys = str.split(trie.delimiter);
        let node: Nullable<TrieNode> = root;
        for (let i = 0; i < keys.length && node; i++) {
            node = node.children.find((c) => c.val === keys[i]);
        }
        return node;
    };

    const collectAllItems = (
        root: Nullable<TrieNode>,
        item: string,
        items: string[],
        includeRoot = true
    ) => {
        if (!root) return;
        if (includeRoot) item = `${item}${trie.delimiter}${root.val}`;
        if (root.isEnd) items.push(item);
        root.children.forEach((c) => collectAllItems(c, item, items));
    };
    const end = !str.length ? trie.root : findEnd(trie.root);
    const items: string[] = [];
    collectAllItems(end, str, items, false);
    return items;
};

const trie = new Trie(' ');

trie.insert('my name is arvind');
trie.insert('my name is nama');
trie.insert('how many kids does Arvind have');
trie.insert('how many jobs does Arvind do');
trie.insert('how many times does Arvind poop');
console.log('Print Trie', trie.print());

console.log('Autocomplete', '`how many`', ':', autocomplete(trie, 'how many'));
console.log('Autocomplete', '`my name`', ':', autocomplete(trie, 'my name'));
console.log('Autocomplete', '``', ':', autocomplete(trie, ' '));
console.log(
    'Autocomplete',
    '`something not in trie`',
    ':',
    autocomplete(trie, 'something not in trie')
);
