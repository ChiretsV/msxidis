// map

function map<T, U>(array: T[], projection: (value: T) => U): U[] {
  const result: U[] = [];
  for (let i = 0; i < array.length; i++) {
      result.push(projection(array[i]));
  }
  return result;
}

const numbers = [1, 2, 3, 4];
const squareNumbers = map(numbers, (num) => num ** 2);

console.log("squareNumbers: ", squareNumbers);

// filter

function filter<T, U>(array: T[], predicate: (value: T) => boolean): U[] {
  const result = [];
    for (let i = 0; i < array.length; i++) {
        if (predicate(array[i])) {
            result.push(array[i]);
        }
    }
    return result;
}

const filteredNumbers = filter(squareNumbers, (num) => num % 2 !== 0);

console.log("filteredNumbers: ", filteredNumbers);

// reduce

function reduce<T, U>( array: T[], aggr: (acc: U, value: T) => U, initialValue: U): U {
  let acc = initialValue;

  for (let i = 0; i < array.length; i++) {
    acc = aggr(acc, array[i]);
  }

  return acc;
}

const sumOfFilteredNumbers = reduce(filteredNumbers, (acc: number, value: number) => acc + value, 0);

console.log("sumOfFilteredNumbers: ", sumOfFilteredNumbers);