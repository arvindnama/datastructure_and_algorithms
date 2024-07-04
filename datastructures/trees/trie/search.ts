import { Trie } from '../../../models/trie.models';

console.log('Demonstrate Trie Tree search operation');

const trie = new Trie('');

console.log('Insert and, ant , dad & do');
trie.insert('and');
trie.insert('ant');
trie.insert('dad');
trie.insert('do');
console.log('Print Trie', trie.print());
console.log('find and in trie', trie.search('and'));
console.log('find ant in trie', trie.search('ant'));
console.log('find do in trie', trie.search('do'));
console.log('find dad in trie', trie.search('dad'));
console.log('find andy in trie', trie.search('andy'));
