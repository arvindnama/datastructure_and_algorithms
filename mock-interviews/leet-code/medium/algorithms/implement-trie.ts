/**
 * A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

Implement the Trie class:

Trie() Initializes the trie object.
void insert(String word) Inserts the string word into the trie.
boolean search(String word) Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise.
boolean startsWith(String prefix) Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.
 */

/**
 * and , andrew, andy
 *          \
 *          a
 *          n
 *          d -> end
 *          r , y -> end
 *          e
 *          w -> end
 *
 *
 *  search - and
 *        \ -> a -> n -> d   , d  -> end : true
 */

interface TrieNode {
    val: string;
    isEnd: boolean;
    children: TrieNode[];
}

const createTrieNode = (val: string, isEnd: boolean = false): TrieNode => {
    return {
        val,
        isEnd,
        children: [] as TrieNode[],
    };
};

class Trie {
    #root: TrieNode = createTrieNode('');

    #search(root: TrieNode, word: string): TrieNode | null {
        if (!word) return root;

        const childNodes = root.children;

        const node = childNodes.find((n) => n.val === word[0]);

        if (!node) return null;

        return this.#search(node, word.substring(1));
    }

    #find(root: TrieNode, letter: string): TrieNode | undefined {
        const childNodes = root.children;
        return childNodes.find((n) => n.val === letter);
    }

    #delete(root: TrieNode, letters: string[]): TrieNode | null {
        if (!root || !letters.length) return root;

        if (root.isEnd && letters.length == 1 && root.val === letters[0]) {
            // I am at the end of the tree.
            if (root.children.length) {
                root.isEnd = false;
                return root;
            }
            // start deleting
            return null;
        }

        if (root.val !== letters[0]) return root;

        letters.shift();
        for (let i = 0; i < root.children.length; i++) {
            const res = this.#delete(root.children[i], letters);
            if (!res) {
                root.children.splice(i, 1);
                return root.isEnd || root.children.length ? root : null;
            }
        }
        return root;
    }

    constructor() {}

    print() {
        console.log(JSON.stringify(this.#root));
    }

    delete(word: string): void {
        const letters = word.split('');
        this.#delete(this.#root, ['', ...letters]);
    }

    insert(word: string): void {
        const letters = word.split('');
        let i = 0;
        let node: TrieNode = this.#root;
        for (; i < letters.length; i++) {
            const res = this.#find(node, letters[i]);
            if (!res) break;
            node = res;
        }

        for (; i < letters.length; i++) {
            const newNode = createTrieNode(letters[i]);
            node.children.push(newNode);
            node = newNode;
        }
        node.isEnd = true;
    }

    search(word: string): boolean {
        const node = this.#search(this.#root, word);
        return node?.isEnd === true;
    }

    startsWith(prefix: string): boolean {
        const node = this.#search(this.#root, prefix);

        return !!node;
    }
}

const trie = new Trie();
trie.insert('apple');
console.log(trie.search('apple')); // return True
console.log(trie.search('app')); // return False
console.log(trie.startsWith('app')); // return True
trie.insert('app');

trie.delete('app');
trie.print();
trie.delete('apple');
trie.print();
console.log(trie.search('app')); // return True
