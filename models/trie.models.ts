export interface TrieNode {
    isEnd: boolean;
    childNodes: TrieNode[];
    key: string;
    idxMap: { [key in string]: number };
}

const createTrieNode = (key: string, isEnd = false): TrieNode => ({
    key,
    childNodes: [],
    idxMap: {},
    isEnd: isEnd,
});

const lookupElementInRoot = (
    root: TrieNode,
    element: string
): Nullable<TrieNode> => {
    if (root.idxMap[element] >= 0) {
        // element already present return the node
        return root.childNodes[root.idxMap[element]];
    }
    return null;
};

const insertIntoTrie = (root: TrieNode, element: string): TrieNode => {
    let node = lookupElementInRoot(root, element);
    if (node) return node;

    node = createTrieNode(element);
    root.idxMap[element] = root.childNodes.length;
    root.childNodes.push(node);
    return node;
};

const navigateAndCollectKeys = (
    root: TrieNode,
    delimiter: string,
    tempKey: string,
    keys: string[]
): void => {
    // in case of actual root element of trie will be empty
    if (root.key) tempKey = `${tempKey}${delimiter}${root.key}`;

    if (root.isEnd) {
        // tempKey is the constructed key store them into keys
        keys.push(tempKey);
    }
    // hence ignore empty string.
    root.childNodes.forEach((n) => {
        navigateAndCollectKeys(n, delimiter, tempKey, keys);
    });
};

const searchKey = (root: TrieNode, keys: string[]): boolean => {
    // we found a match
    if (root.isEnd && keys.length === 1 && root.key === keys[0]) return true;

    // there is a mismatch in the key and node
    if (keys[0] !== root.key) return false;

    // remove the top most element and now each for the remaining in root's children
    keys.shift();

    return root.childNodes.some((r) => searchKey(r, keys));
};

const deleteElement = (root: TrieNode, keys: string[]): Nullable<TrieNode> => {
    // we reached the end
    if (root.isEnd && keys.length === 1 && root.key === keys[0]) return null;

    // match broken , so don't delete just return.
    if (root.key !== keys[0]) return root;

    // match found, but we dint reach the end so further navigate down.

    keys.shift();
    for (let i = 0; i < root.childNodes.length; i++) {
        const node = deleteElement(root.childNodes[i], keys);
        if (!node) {
            /**
             * we found a match
             *
             * we delete the entry from the childNodes
             *
             * if current node is leaf i.e. there is no more children below it
             * then this is end of the word and it is not a sub-word. of another
             * larger word.
             *  For example: and & andrew , both are words , and is a sub-word of andrew.
             *  Hence and (d node will have isEnd == true & will still have children)
             * In this case we will  not delete the node instead we will just reset
             * isEnd = false; (to preserve the larger word i.e. andrew)
             */

            if (root.childNodes[i].childNodes.length) {
                // found a match and this is a subword hence dont delete
                // just reset isEnd to false;
                root.childNodes[i].isEnd = false;
                return root;
            } else {
                root.idxMap[keys[0]] = -1;
                root.childNodes.splice(i, 1);
                const isASubWord = root.isEnd; // root so far is a sub-word
                // if current root is end of another sub-word we should not delete it.
                // else delete upwards
                return isASubWord ? root : null;
            }
        }
    }
    return root;
};

export class Trie {
    #root: TrieNode = createTrieNode('');

    constructor(public delimiter = '') {}

    public get root(): TrieNode {
        return this.#root;
    }

    public insert(element: string) {
        let node = this.#root;
        element.split(this.delimiter).forEach((key: string) => {
            node = insertIntoTrie(node, key);
        });
        node.isEnd = true;
    }

    public print(): string[] {
        const keys: string[] = [];
        navigateAndCollectKeys(this.#root, this.delimiter, '', keys);
        return keys;
    }

    public search(key: string): boolean {
        let splitKeys = key.split(this.delimiter);
        // root node in the tree is always empty, hence add a dummy to the the list
        splitKeys = ['', ...splitKeys];
        return searchKey(this.#root, splitKeys);
    }

    public delete(key: string): void {
        let splitKeys = key.split(this.delimiter);
        // root node in the tree is always empty, hence add a dummy to the the list
        splitKeys = ['', ...splitKeys];
        deleteElement(this.#root, splitKeys);
    }
}
