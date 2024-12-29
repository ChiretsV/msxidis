export interface DataStructureCommonInterface {
  getLength(): number
  getByIndex(i: number): number
  setByIndex(i: number, value: number): void
  contains(element: number): boolean
  insert(element: number): void
  deleteFirst(element: number): void
}

let currentTimer = null
export function timeStart() {
  currentTimer = process.hrtime()
}

export function timeEnd() {
  const [seconds, nanoseconds] = process.hrtime(currentTimer)
  currentTimer = null
  const totalNanoseconds = seconds * 1e9 + nanoseconds
  const milliseconds = totalNanoseconds / 1e6

  return milliseconds
}
