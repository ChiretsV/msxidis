import {DataStructureCommonInterface} from './common'

export function createMap(length: number): DataStructureCommonInterface {
  const map = new Map<number, number>();

  for (let i = 0; i < length; i++) {
    map.set(i, Math.floor(Math.random() * 1000));
  }

  return {
    getLength: () => map.size,
    getByIndex: (i) => map.get(i) || null,
    setByIndex: (i, value) => map.set(i, value),
    contains: (element) => {
      for (const val of map.values()) {
        if (val === element) return true;
      }
      return false;
    },
    insert: (element) => map.set(map.size, element),
    deleteFirst: (element) => {
      for (const [key, val] of map.entries()) {
        if (val === element) {
          map.delete(key);
          break;
        }
      }
    }
  };
}
