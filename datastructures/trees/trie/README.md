# Trie Data Structure

Trie a special kind of a tree data structure used for storing dynamic set of string
It is effective in managing storage and retrieval of data.

Use Cases:

- Storing a dictionary of words

```javascript
            Root
            /   \
           a     d
          /     /  \ 
         n     a    o
        / \   / 
       d   t d
       
words stored:
and 
ant 
dad
do
```

## Data Structure

A Trie DS , will have a root with and empty key and can have x number of ChildNodes
each ChildNode will contain a key (can be a letter or word based on use-case)

Each TrieNode will also indicate if it is end of the word/sentence to represent leaf node.

Since key can be a letter or word , we will need some kind of letter / word to index conversion to figure out where the key is store in the child.

```typescript
interface TrieNode {
    childNodes:TrieNode[];
    key: string;
    isEnd: boolean;
    indexer: {[key in string]: number};
}
```

## Operations

### Insertion

You can insert an Trie element into a trie.

Lets take an example: Insert a set of words into trie:

"And Ant dad & do"

```javascript
// First insert And 
//  a,n,d

            Root
            /
           a
          /
         n
        /   
       d

// Ant : not since a & n are already present , we will not duplicate it instead naviagte down and only add t
            Root
            /
           a
          /
         n
        / \ 
       d   t

// dad & do:

            Root
            /   \
           a     d
          /     / \ 
         n     a   o
        / \   /
       d   t d 

```

## Search

For a given trie tree, we need to search if a string is present or not.

Example: Search for the presence of dad in the trie DS

step1: split dad into d,a,d
step2: look up d under roots children.
step3: if found recurse down the child with child node as root and search of remaining portion of the key.
step4: if remaining portion of the string length is zero and child isEnd == true , then we have found the key.

## Delete

 Delete a given word / sentence from trie data structure.

 Example: Delete `and` from trie

 for delete we need to take a bottoms up approach, i.e. we will need to first navigate
 to the end of the word and start deleting the nodes from there till up. 

 step1: navigate using dfs, when we reach `d` (isEnd = true) we will need to delete it (pass null back to the parent)
 step2: when parent receives a null , i.e. it a node was delete below it, we will to 
        step2.a: check if current node had only 1 child previously if yes this node becomes the new leaf and if so we need to delete this node as well and navigate up.
        step2.b: if the current node has more than one child we need to stop the delete operation and return self.


## Display

TO get all the words / sentences in the string, this operation is very useful. 

Best way to get all words/sentences is to perform a DFS on the tree.
We start from the root and visit each and every child & construct temporary word or string
if we child is a leaf (i.e. isEnd = true, we append such temp strings as complete words) and once all nodes are visited we have the constructed the list of words/sentences