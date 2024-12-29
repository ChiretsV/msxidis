import {DataStructureCommonInterface} from './common'

type LinkedListNode = {
  value: number
  next: LinkedListNode | null
}

export function createLinkedList(length: number): DataStructureCommonInterface {
  let last: LinkedListNode = null
  let first: LinkedListNode = null
  for (let i = 0; i < length; i++) {
    const randomNumber = Math.floor(Math.random() * 100)
    const node: LinkedListNode = {value: randomNumber, next: null}
    if (first === null && last === null) {
      first = node
      last = node
    } else {
      last.next = node
      last = node
    }
  }

  return {
    getLength() {
      let counter = 0
      let node = first
      while (node !== null) {
        node = node.next
        counter++
      }
      return counter
    },
    getByIndex(index) {
      let currentIndex = 0;
      let node = first;

      while (node !== null) {
        if (currentIndex === index) {
          return node.value;
        }
        node = node.next;
        currentIndex++;
      }

      throw new Error('Index out of bounds');
    },

    setByIndex(index, value) {
      let currentIndex = 0;
      let node = first;

      while (node !== null) {
        if (currentIndex === index) {
          node.value = value;
          return;
        }
        node = node.next;
        currentIndex++;
      }

      throw new Error('Index out of bounds');
    },

    contains(element) {
      let node = first;

      while (node !== null) {
        if (node.value === element) {
          return true;
        }
        node = node.next;
      }

      return false;
    },

    deleteFirst(element) {
      let node = first;
      let prev: LinkedListNode | null = null;
      let index = 0;

      while (node !== null) {
        if (node.value === element) {
          if (prev === null) {
            first = node.next;
          } else {
            prev.next = node.next;
          }

          return index;
        }

        prev = node;
        node = node.next;
        index++;
      }

      throw new Error('Element not found');
    },

    insert(element) {
      const newNode: LinkedListNode = { value: element, next: null };

      if (last === null) {
        first = newNode;
        last = newNode;
      } else {
        last.next = newNode;
        last = newNode;
      }

      return this.getLength();
    }
  }
}
