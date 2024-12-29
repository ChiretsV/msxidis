import {DataStructureCommonInterface} from './common'

export function createArray(length: number): DataStructureCommonInterface {
  const array = new Array(length)
  for (let i = 0; i < length; i++) {
    array[i] = Math.floor(Math.random() * 100)
  }

  return {
    getLength() {
      return array.length
    },
    getByIndex(i) {
      return array[i]
    },
    setByIndex(i, v) {
      array[i] = v
    },
    contains(element) {
      for (const n of array) {
        if (n === element) {
          return true
        }
      }
      return false
    },
    deleteFirst(element) {
      let elementIndex = null
      for (let i = 0; i < array.length; i++) {
        if (array[i] === element) {
          elementIndex = i
          break
        }
      }
      if (elementIndex === null) {
        return
      }

      array.splice(elementIndex, 1)
    },
    insert(element) {
      array.unshift(element)
    }
  }
}
