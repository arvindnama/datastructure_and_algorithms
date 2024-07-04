/**
 * We are given a Trie with a set of strings stored in it.
 * Now the user types in a prefix of his search query,
 * we need to give him all recommendations to auto-complete his query based on the strings stored in the Trie.
 */

import { Trie, TrieNode } from '../../../models/trie.models';

const autocomplete = (trie: Trie, str: string): string[] => {
    let keys = str.split(trie.delimiter);
    keys = ['', ...keys];

    const findNodeMatchingStr = (
        root: TrieNode,
        keys: string[]
    ): Nullable<TrieNode> => {
        // found the node where the str ends.
        // note the root need not be the end.
        if (keys.length === 1 && root.val === keys[0]) return root;

        // we lost it there is such pattern in our trie
        if (keys[0] !== root.val) return null;

        keys.shift();

        for (let i = 0; i < root.children.length; i++) {
            const res = findNodeMatchingStr(root.children[i], keys);
            if (!res) {
                // did not find a match in this child `i` , skip and move fwd
                continue;
            }

            // round a match , lets stop and return
            return res;
        }
    };

    const navigate = (
        root: TrieNode,
        tempStr: string,
        suggestions: string[]
    ) => {
        tempStr = `${tempStr}${trie.delimiter}${root.val}`;
        if (root.isEnd) {
            suggestions.push(tempStr);
        }

        root.children.forEach((c) => navigate(c, tempStr, suggestions));
    };

    const node = findNodeMatchingStr(trie.root, keys);

    if (!node) {
        // [improvement]: pattern not found , add to trie.
        trie.insert(str);
        // pattern not found
        return [];
    }

    const suggestions: string[] = [];
    navigate(node, str, suggestions);
    return suggestions;
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
console.log(
    'Autocomplete',
    '`something not in trie`',
    ':',
    autocomplete(trie, 'something not in trie')
);
console.log('Print Trie', trie.print());
console.log(
    'Autocomplete',
    '`something not in trie`',
    ':',
    autocomplete(trie, 'something not in trie')
);
