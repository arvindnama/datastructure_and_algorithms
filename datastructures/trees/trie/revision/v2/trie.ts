interface TrieNode {
    isEnd: boolean;
    children: TrieNode[];
    val: string;
}

const createTrieNode = (val: string, isEnd = false): TrieNode => ({
    val,
    isEnd,
    children: [],
});

const lookup = (root: TrieNode, key: string): TrieNode => {
    let node = root.children.find((c) => c.val === key);
    if (!node) {
        node = createTrieNode(key);
        root.children.push(node);
    }
    return node;
};

const collectItemsInTrie = (root: TrieNode, delimiter: string): string[] => {
    const data: string[] = [];
    const collect = (root: TrieNode, item: string) => {
        if (!root) return;

        item = `${item}${delimiter}${root.val}`;
        if (root.isEnd) data.push(item);

        root.children.forEach((c) => collect(c, item));
    };
    collect(root, '');
    return data;
};

const search = (root: TrieNode, keys: string[]): boolean => {
    if (!root || keys.length === 0) return false;
    // I have reached the leaf and i have only one key
    // and they match , hence I am done with my search
    if (root.isEnd && keys.length === 1 && root.val === keys[0]) return true;
    if (root.val !== keys[0]) return false;
    keys.shift();

    return root.children.some((c) => search(c, keys));
};

const deleteFromTrie = (root: TrieNode, keys: string[]): Nullable<TrieNode> => {
    if (!root || !keys.length) return root;

    if (root.isEnd && keys.length === 1 && root.val === keys[0]) {
        // reached the end of the item that i need to delete from trie
        // there are 2 possibilities
        //      1. if root is leaf , then i just delete this leaf as well
        //      2. if root has children, then I am not suppose to delete anything
        //         cos there is another bigger item associated ,
        //         But we will no longer support this current item in trie
        //          hence we will need to reset isEnd to false (so if i search for this
        //          item again after delete i should not find it)

        if (root.children.length) {
            root.isEnd = false;
            return root;
        }
        return null;
    }

    // the item to delete is not there in trie just return
    if (root.val !== keys[0]) return root;
    // else i have matching key , remove the top and go down the deletion

    keys.shift();

    for (let i = 0; i < root.children.length; i++) {
        const res = deleteFromTrie(root.children[i], keys);
        if (!res) {
            // child was delete we need to remove from children array
            root.children.splice(i, 1);
            return root.isEnd || root.children.length ? root : null;
        }
    }
    return root;
};

class Trie {
    #root = createTrieNode('');

    constructor(private delimiter = '') {}

    public insert(data: string) {
        const keys = data.split(this.delimiter);
        let node = this.#root;
        for (let i = 0; i < keys.length; i++) {
            node = lookup(node, keys[i]);
        }
        node.isEnd = true;
    }

    public search(data: string): boolean {
        let keys = data.split(this.delimiter);
        // include root.
        keys = ['', ...keys];
        return search(this.#root, keys);
    }

    public print() {
        const items = collectItemsInTrie(this.#root, this.delimiter);
        console.log(items);
    }

    public delete(data: string) {
        let keys = data.split(this.delimiter);
        keys = ['', ...keys]; // include root
        deleteFromTrie(this.#root, keys);
    }
}

const trie = new Trie('');

console.log('Insert and, ant , dad & do');
trie.insert('and');
trie.insert('andrew');
trie.insert('ant');
trie.insert('dad');
trie.insert('do');

console.log('Print Trie');
trie.print();

console.log('Search for andrew', trie.search('andrew'));

trie.delete('do');
console.log('Print Trie');
trie.print();

trie.delete('and');
console.log('Print Trie');
trie.print();
