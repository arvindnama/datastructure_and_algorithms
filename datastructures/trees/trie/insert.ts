import { Trie } from '../../../models/trie.models';

console.log('Demonstrate Trie Tree insert operation');

let trie = new Trie('');

console.log('Insert and, ant , dad & do');
trie.insert('and');
trie.insert('andrew');
trie.insert('ant');
trie.insert('dad');
trie.insert('do');
console.log('Print Trie', trie.print());

console.log('Demonstrate Trie Tree insert operation - sentences');

trie = new Trie(' ');

trie.insert('my name is arvind');
trie.insert('my name is nama');
trie.insert('how many kids does Arvind have');
trie.insert('how many jobs does Arvind do');
trie.insert('how many times does Arvind poop');
console.log('Print Trie', trie.print());
