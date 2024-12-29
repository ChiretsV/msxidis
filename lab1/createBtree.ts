import btree from 'btreejs';
import { DataStructureCommonInterface } from './common';

export function createBTree(length: number): DataStructureCommonInterface {
  // Создаем класс дерева с порядком 2 и числовым сравнением
  const Tree = btree.create(2, btree.numcmp);
  const bTree = new Tree();

  for (let i = 0; i < length; i++) {
    const randomKey = Math.floor(Math.random() * 100);
    const randomValue = Math.floor(Math.random() * 100);
    bTree.put(randomKey, randomValue);
  }

  return {
    getLength: () => {
      return bTree.count(null, null); 
    },
    getByIndex: (i) => {
      const keys: number[] = [];
      bTree.walk(null, null, (key, value) => {
        keys.push(key);
      });
      const key = keys[i];
      if (typeof key !== 'undefined') {
        return bTree.get(key) || null;
      }
      return null;
    },
    setByIndex: (i, value) => {
      const keys: number[] = [];
      bTree.walk(null, null, (key, value) => {
        keys.push(key);
      });
      const key = keys[i];
      if (typeof key !== 'undefined') {
        bTree.put(key, value);
      }
    },
    contains: (element) => {
      let found = false;
      bTree.walk(null, null, (key, value) => {
        if (value === element) {
          found = true;
          return true; 
        }
      });
      return found;
    },
    insert: (element) => {
      const randomKey = Math.floor(Math.random() * 100);
      bTree.put(randomKey, element);
    },
    deleteFirst: (element) => {
      bTree.walk(null, null, (key, value) => {
        if (value === element) {
          bTree.del(key);
          return true;
        }
      });
    }
  };
}
