export interface TrieNode {
    isEnd: boolean;
    children: TrieNode[];
    val: string;
}

const createTrieNode = (val: string, isEnd = false): TrieNode => ({
    val,
    isEnd,
    children: [],
});

const lookupKeyInNode = (node: TrieNode, key: string): Nullable<TrieNode> =>
    node.children?.find((n) => n.val === key);

const insertIntoTree = (root: TrieNode, key: string): TrieNode => {
    let node = lookupKeyInNode(root, key);
    if (node) return node; // found node ,do create reuse it.

    node = createTrieNode(key);
    root.children.push(node);

    return node;
};

const navigateNode = (
    root: TrieNode,
    delimiter: string,
    tempData: string,
    trieDataStore: string[]
) => {
    if (!root) return;
    tempData = `${tempData}${delimiter}${root.val}`;
    if (root.isEnd) {
        trieDataStore.push(tempData);
    }
    root.children.forEach((c) =>
        navigateNode(c, delimiter, tempData, trieDataStore)
    );
};

const search = (root: TrieNode, keys: string[]): boolean => {
    if (keys.length === 0) return false;
    // found the data
    if (root.isEnd && keys.length === 1 && root.val === keys[0]) return true;

    if (root.val !== keys[0]) return false; // no match

    // key & tree matched so far , let loop down the tree.
    keys.shift();

    return root.children.some((c) => search(c, keys));
};

const deleteData = (root: TrieNode, keys: string[]): Nullable<TrieNode> => {
    // no match found - key exhausted stop search here and return.
    // by returning root we are ensure nothing is deleted.
    if (keys.length === 0) return root;
    // found the end of the data in the tree, start delete the node form here
    // upwards, Return null to its parent
    if (root.isEnd && keys.length === 1 && root.val === keys[0]) {
        // we found the `data` and leaf node is being deleted
        // we need to evaluate if current node needs to be deleted or not.
        // if current node has no children and isEnd true,
        //      then `data` is not a subword in the tree we can delete upwards.
        // else if current node  has children and isEnd true ,
        //      then there are more words down the the tree.
        // we should not delete the child node instead just reset isEnd as false
        // this will ensure the `data` is no long recognized but it is just part of //
        // another large word

        if (root.children.length) {
            root.isEnd = false;
            return root;
        }
        // no children , start deleting
        return null;
    }

    // part of the data mismatch, stop search and return root to prevent any deletion
    if (root.val !== keys[0]) return root;

    keys.shift();

    for (let i = 0; i < root.children.length; i++) {
        const res = deleteData(root.children[i], keys);
        if (!res) {
            // remove the node from children array.
            root.children.splice(i, 1);

            // if i need to delete the current root ??
            // if the root has zero children , then we need to delete root as well
            // if root is end then there is another subword present hence we should stop
            // delete here.
            return root.isEnd || root.children.length ? root : null;
        }
    }

    return root;
};

export class Trie {
    #root = createTrieNode('');

    public get root(): TrieNode {
        return this.#root;
    }

    constructor(public delimiter = '') {}

    public insert(data: string): void {
        const keys = data.split(this.delimiter);
        let node = this.#root;
        keys.forEach((key) => (node = insertIntoTree(node, key)));
        // after inserting all the parts of data , mark the last node as end.
        node.isEnd = true;
    }

    public search(data: string): boolean {
        let keys = data.split(this.delimiter);
        // root has a empty  value
        keys = ['', ...keys];
        return search(this.#root, keys);
    }

    public delete(data: string) {
        let keys = data.split(this.delimiter);
        // root has a empty  value
        keys = ['', ...keys];
        deleteData(this.#root, keys);
    }

    public print(): string[] {
        const dataStore: string[] = [];
        navigateNode(this.#root, this.delimiter, '', dataStore);
        return dataStore;
    }
}
