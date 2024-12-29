import {plot, stack} from 'nodeplotlib'
import {DataStructureCommonInterface, timeStart, timeEnd} from './common'
import {createArray} from './createArray'
import { createLinkedList } from './linkedList'
import { createSet } from './createSet'
import { createMap } from './createMap'
import { createObject } from './createObject'
import { createBTree } from './createBtree'

function testStructure(
  factory: (length: number) => DataStructureCommonInterface
) {
  const sizesToTest = [
    10,
    100,
    1000,
    10000,
    100000,
    1000000,
    10000000,
    20000000,
    30000000
  ]

  const numberOfExperiments = 3

  const averageTimeMeasurements = {
    allocation: [],
    getLength: [],
    getByIndex: [],
    setByIndex: [],
    containsRandom: [],
    containsNonExisting: [],
    insert: [],
    deleteFirst: []
  }

  for (const length of sizesToTest) {
    const timeMeasurements = {
      allocation: [],
      getLength: [],
      getByIndex: [],
      setByIndex: [],
      containsRandom: [],
      containsNonExisting: [],
      insert: [],
      deleteFirst: []
    }
    console.log(`Проверка структуры из ${length} элементов`)
    for (const experimentNumber of [...Array(numberOfExperiments).keys()]) {
      console.log(`#${experimentNumber + 1}`)

      timeStart()
      const structure = factory(length)
      timeMeasurements.allocation.push(timeEnd())

      timeStart()
      structure.getLength()
      timeMeasurements.getLength.push(timeEnd())

      const randomIndex = Math.floor(Math.random() * length)
      timeStart()
      structure.getByIndex(randomIndex)
      timeMeasurements.getByIndex.push(timeEnd())

      timeStart()
      structure.setByIndex(randomIndex, 900)
      timeMeasurements.setByIndex.push(timeEnd())

      const randomElement = Math.floor(Math.random() * 100)
      timeStart()
      structure.contains(randomElement)
      timeMeasurements.containsRandom.push(timeEnd())

      timeStart()
      structure.contains(-1)
      timeMeasurements.containsNonExisting.push(timeEnd())

      timeStart()
      structure.insert(randomElement)
      timeMeasurements.insert.push(timeEnd())

      timeStart()
      structure.deleteFirst(randomElement)
      timeMeasurements.deleteFirst.push(timeEnd())
    }

    for (const key of Object.keys(
      timeMeasurements
    ) as (keyof typeof timeMeasurements)[]) {
      averageTimeMeasurements[key].push(
        timeMeasurements[key].reduce((x, y) => x + y) / numberOfExperiments
      )
    }
  }

  for (const chartName of Object.keys(averageTimeMeasurements)) {
    stack(
      [
        {
          x: sizesToTest,
          y: averageTimeMeasurements[chartName]
        }
      ],
      {title: chartName}
    )
  }

  plot()
}

// testStructure(createArray)
// testStructure(createLinkedList);
// testStructure(createSet);
// testStructure(createMap);
// testStructure(createObject);

testStructure(createBTree);