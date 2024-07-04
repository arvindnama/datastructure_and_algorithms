import { Trie } from '../../../models/trie.models';

console.log('Demonstrate Trie Tree insert operation');

const trie = new Trie('');

console.log('Insert and, ant , dad & do');
trie.insert('and');
trie.insert('ant');
trie.insert('dad');
trie.insert('do');
console.log('Print Trie', trie.print());
