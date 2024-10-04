/**
 * A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

Implement the Trie class:

Trie() Initializes the trie object.
void insert(String word) Inserts the string word into the trie.
boolean search(String word) Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise.
boolean startsWith(String prefix) Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.
 */


/*
 A trie is a data structure that allows you to effective store words as a nested tree.
  Useful in place where we need all patterns / string matching a prefix.

  Trie is a simple tree data structure
    where each node will have n children.

        root
        /
       my
       / \
    name Age
      /   \
    is    is
    /     /
          10
  Arvind   Atharv

*/


interface TrieNode {
    val: string;
    isEnd: boolean;
    children: TrieNode[]
}

const createTireNode = (val: string, isEnd:boolean = false) : TrieNode => {
    return {
        val,
        isEnd,
        children: []
    }
}


const find = (root: TrieNode , val: string): TrieNode| undefined => {
    if(!root || !val) return
    return root.children.find(r => r.val === val)
}


const search = (root: TrieNode , keys: string[]): TrieNode | undefined => {

    /*
        / , [,a,p,p,l,e]
        a , [a,p,p,l,e]
        p , [p,p,l,e]
        p , [p,l,e]
        l , [l,e]
        e , [e]
    */

    if(!root || !keys.length) return;
    if(root.val === keys[0] && keys.length == 1) return root;

    if(root.val !== keys[0]) return;

    keys.shift();
    for(let i = 0 ; i < root.children.length; i++) {
        const res = search(root.children[i], keys);
        if(res) {
            return res;
        }
    }
}

const deleteFromTrie = (root: TrieNode, keys: string[]) : TrieNode | null=> {

    if(root.isEnd && keys.length === 1 && root.val === keys[0]) {
        // found value to delete
        // delete it from tree only if it has no children
        // if it has children, lets just mark this as not the end

        if(root.children.length) {
            root.isEnd = false;
            return root;
        }
        return null; // returning null to parent is an indication that i am deleting the root
    }

    // no match , so stop the traversal and return the root back
    // returning the root back to parent is an indication nothing to delete
    if(root.val !== keys[0])  return root;

    // we have root & key[0] matching lets move down and delete the remaining
    keys.shift();
    for(let i = 0 ; i < root.children.length; i++) {
        const res = deleteFromTrie(root.children[i], keys);

        if(!res) {
            // the child was delete , lets remove from parents children list

            root.children.splice(i,1);
            //now we need to decide if root is to be removed or not
            // remove if root has no more children and is not end (if it is end it represent another entry)
            return root.isEnd || root.children.length ? root: null
        }
        // res was not null hence dont have to delete anything
    }
    // all children process, if i have reached here , none of my children were delete.
    // hence i dont have to delete myself
    return root;

}


class Trie {

    #root: TrieNode = createTireNode('');

    constructor(private delimiter = '') {}

    insert(val: string): void {
        const keys = val.split(this.delimiter);
        let i = 0;
        let node: TrieNode = this.#root;
        for(; i < keys.length; i++) {
            // navigate up to a point in the tree from root where we already have the data
            const res = find(node, keys[i]);
            if(!res) {
                // from here onwards my tree does not have the data;
                // let me break and start adding keys from here to end into the node
                break;
            }
            node = res;
        }

        for(;i< keys.length; i++) {
            // insert these into node
            const temp = createTireNode(keys[i]);
            node.children.push(temp);
            node = temp;
        }
        // i have inserted all keys into the tree
        // lets mark the last node as end so we know it is a word/ sentence

        node.isEnd = true;
    }

    search(val: string): boolean  {
        const keys = ["", ...val.split(this.delimiter)];
        const node = search(this.#root, keys);
        return node?.isEnd ?? false;
    }

    startsWith(val: string): boolean  {
        const keys = ["", ...val.split(this.delimiter)];
        const node = search(this.#root, keys);
        return !!node
    }

    delete(val: string): void  {
        deleteFromTrie(this.#root, ["" , ...val.split(this.delimiter)])
    }

    print() {
        console.log(JSON.stringify(this.#root, null,2));
    }

    autocomplete(prefix: string): string[] {
        /**
         * first search for the node in tree with prefix
         * once found we can traverse down and collect all the strings
         */

        const node = search(this.#root, ['', ...prefix.split(this.delimiter)]);
        if(!node) return [] ; // prefix not found;

        // now collect all values till.

        const res: string[] = [];
        const collect = (root: TrieNode, prefix: string) => {
            const newPrefix = `${prefix}${this.delimiter}${root.val}`
            if(root.isEnd) res.push(newPrefix);

            for(const node of root.children) {
                collect(node, newPrefix)
            }
        }

        node.children.forEach(n => collect(n, prefix))
        return res;
    }
}


const trie = new Trie(' ');
trie.insert('My name is Arvind');
trie.insert('My name is Atharv');
console.log('Search :: My name is Arvind', trie.search('My name is Arvind'));
console.log('Starts with:: My name is',trie.startsWith('My name is')); // return True
trie.insert('My Age is 38');

trie.delete('My name is Arvind');
trie.delete('My');

trie.insert('My name is Arvind');
// trie.print();

console.log("Auto complete , My name", trie.autocomplete("My name is"));
