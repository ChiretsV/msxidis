import {DataStructureCommonInterface} from './common'

export function createObject(length: number): DataStructureCommonInterface {
  const obj: { [key: number]: number } = {};

  for (let i = 0; i < length; i++) {
    obj[i] = Math.floor(Math.random() * 100);
  }

  return {
    getLength: () => Object.keys(obj).length,
    getByIndex: (i) => obj[i] || null,
    setByIndex: (i, value) => {
      obj[i] = value;
    },
    contains: (element) => {
      return Object.values(obj).includes(element);
    },
    insert: (element) => {
      obj[Object.keys(obj).length] = element;
    },
    deleteFirst: (element) => {
      for (const key in obj) {
        if (obj[key] === element) {
          delete obj[key];
          break;
        }
      }
    }
  };
}
