import {DataStructureCommonInterface} from './common'

export function createSet(length: number): DataStructureCommonInterface {
  const set = new Set<number>();

  for (let i = 0; i < length; i++) {
    set.add(Math.floor(Math.random() * 100));
  }

  return {
    getLength: () => set.size,
    getByIndex: (i) => {
      const arr = Array.from(set);
      return arr[i] || null;
    },
    setByIndex: (i, value) => {
      const arr = Array.from(set);
      arr[i] = value;
      set.clear(); 
      arr.forEach(val => set.add(val)); 
    },
    contains: (element) => set.has(element),
    insert: (element) => set.add(element),
    deleteFirst: (element) => set.delete(element)
  };
}
