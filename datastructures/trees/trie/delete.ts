import { Trie } from '../../../models/trie.models';

console.log('Demonstrate Trie Tree Delete operation');

const trie = new Trie('');

console.log('Insert and, ant , dad & do');
trie.insert('and');
trie.insert('ant');
trie.insert('dad');
trie.insert('do');
console.log('Print Trie', trie.print());

console.log('Delete dad ', trie.delete('dad'), trie.print());
console.log('Delete ant ', trie.delete('ant'), trie.print());
console.log('Delete and ', trie.delete('and'), trie.print());
console.log('Delete do ', trie.delete('do'), trie.print());

console.log('Insert and, ant , dad & do');
trie.insert('and');
trie.insert('ant');
trie.insert('dad');
trie.insert('do');
console.log('Print Trie', trie.print());
