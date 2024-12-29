// Знакомство с node.js и языком TypeScript

// node.js - среда, позволяющая исполнять сценарии на языке JavaScript
// в виде самостоятельного приложения. В отличие от традиционного исполнения
// JavaScript в браузере, node.js позволяет пользоваться языком для написания
// более привичных программ, аналогично таким платформам, как Java, .NET,
// Python, и т.п.

// Для запуска этого файла при помощи VS Code, нажмите F5.
// Для запуска этого файла из консоли, вызовите в ней команду: "npx ts-node helloWorld.ts"

// Для работы с консолью в JavaScript и node.js используется глобальный объект
// console. Функция console.log позволяет вывести на экран любое значение,
// например строку.

console.log('Hello world!')

// Комментарии в JavaScript и TypeScript имеют стандартный C-подобный синтаксис.
// Двойной обратный слэш "//" создаёт комментарий до конца строки, многострочный
// комментарий создаётся при помощи "/*" и "*/":

/* 
я многострочный комментарий!
*/

// Далее, в этом скрипте, если какая-то строчка требует вашего вмешательства как часть
// задания, она будет помечена в начале комментарием /*>>*/

// process.exit завершает выполнение текущего сценария с указанным кодом выхода.
// Как только будете готовы продолжить знакомство со средой и языком, удалите или
// закомментируйте эту строчку.

// /*>>*/ process.exit(0)

// JavaScript - язык с динамической типизацией. Это означает, что типы данных
// могут быть изменены в процессе выполнения, и их нельзя явно указать. С одной стороны,
// это даёт языку достаточно большую гибкость засчёт использования "утиной типизации". С
// другой стороны, это усложняет проектирование API, поскольку, например, в качестве
// аргументов какой-либо функции может выступать переменная любого типа, который нельзя
// установить заранее, и можно проверить только во время выполнения.

// JavaScript реализует автоматическое управление памятью. Любые значения, объекты, переменные
// находятся в памяти до тех пор, пока до них есть путь по ссылкам из исполняющегося кода.
// Если значение в памяти не достижимо из исполняющегося кода, память будет автоматически
// высвобождена сборщиком мусора в следующем проходе.

// JavaScript, в том числе и в node.js, в общем случае однопоточен. Отдельные реализации
// многопоточности, например, worker_threads, не имеют доступа к одним и тем же переменным,
// вместо этого взаимодействие между потоками всегда осуществляется передачей сообщений.
// В большинстве сценариев многопоточность в node.js реализуется запуском отдельного процесса.
// В рамках данного курса мы не будем использовать многопоточность.

// TypeScript - надмножество языка JavaScript, добавляющее в язык поддержку
// статической типизации. TypeScript добавляет дополнительный этап "транспиляции" -
// перевода кода на TypeScript в код на JavaScript. При этом вся статическая
// информация о типах из кода изымается. При этом на этапе транспиляции дополнительно
// осуществляется проверка типов, и при несовпадении генерируется соответствующая ошибка.
// В текущем проекте транспиляция осуществляется прозрачно с использованием пакета ts-node.

// Выражение "import" используется для подключения внешнего файла или модуля.
// В данном случае импортируется стандартный модуль node.js 'assert' для проверки выполнения
// каких-либо условий. Если условие не выполняется, генерируется ошибка AssertionError.

// В этом сценарии используется вызов assert, который проверяет истинность логического
// условия, а также методы assert.equal/assert.notEqual, которые проверяет, что два значения
// равны или не равны, соответственно.
import assert from 'assert'

assert(true)
assert.equal(2, 2)

//==================================1. Переменные и типы======================================

// Для объявления переменных используются ключевые слова let и const, а также
// устаревший способ объявления с помощью var, который рекомендуется не использовать.

// "let" объявляет перезаписываемую переменную. Без явного указания типа все
// переменные в TypeScript имеют тип 'any' и могут содержать значения
// любого типа в любой момент (т.н. динамический тип).

let a // без явного указания имеет тип any и значение по умолчанию undefined

a = 5 // тип изменен на 'number'
a = 'str' // тип изменен на 'string'

// Для указания типов времени транспиляции в TypeScript используется нотация с двоеточием

let someNumber: number

someNumber = 5

// если раскомментировать следующую строчку, она вызовет ошибку:
// someNumber = 'str' // error TS2322: Type '"str"' is not assignable to type 'number'

// "const" объявляет переменную, которая не может быть перезаписана. Такая переменная
// не является константой в привичном смысле - у неё может быть любое вычислимое
// значение; разница только в том, что присваивание такой переменной можно сделать
// только в момент её объявления.

const fourtyTwo = 42
// если раскомментировать следующую строчку, она вызовет ошибку:
// fourtyTwo = 5 // error TS2588: Cannot assign to 'fourtyTwo' because it is a constant

// Следует отметить, что переменные const ссылочного типа (например, объекты)
// могут быть модифицированы по ссылке: const указывает только на то, что невозможно
// перезаписать саму ссылку в этой конкретной переменной

// Если переменная инициализирована в момент объявления, TypeScript автоматически
// выводит её тип. Например, переменная fourtyTwo автоматически получает тип
// number. Если такое поведение нежелательно, можно явно указать тип 'any':

let thisIsInferredNumber = 42
thisIsInferredNumber = 52
// thisIsInferredNumber = 'some string' // error TS2322: Type '"some string"' is not assignable to type 'number'

let thisIsAny: any = 5
thisIsAny = 'some string'

// Для проверки типа на этапе выполнения сценария используется оператор typeof.
// typeof возвращает одну из 8 строк:
// "undefined", "number", "bigint", "boolean", "string", "symbol", "object", "function"

//==================================2. undefined======================================

// 'undefined': Тип 'undefined' имеет только значение undefined. При этом это значение
// автоматически имеют отсутствующие свойства объектов, не проинициализированные переменные,
// результаты вызова функций, которые ничего не возвращают, а также результат выполнения
// специального оператора void с любым значением
assert.equal(typeof undefined, 'undefined')
assert.equal(void 'this value does not matter', undefined)

// при попытке что-то сделать с переменной, имеющей тип 'undefined' (например, вызвать
// её как функцию или обратиться к её свойству) будет сгенерирована ошибка:

/*>>*/ let someUndefinedValue
// /*>>*/ someUndefinedValue.foo // приводит к ошибке "Cannot read property 'foo' of undefined"
// /*>>*/ someUndefinedValue() // приводит к ошибке "someUndefinedValue is not a function"

//==================================3. number======================================
// 'number': числа в JavaScript/node не разделяются на целые числа и числа с
// плавающей точкой. В зависимости от среды, для их представления в памяти может использоваться
// 32-битное целое, 32-битное с плавающей точкой (float в С/С++) или 64-битное с плавающей
// точкой (double в C/C++), при этом смена типов осуществляется незаметно при использовании.

assert.equal(typeof 42, 'number')

// Для чисел определены стандартные операции +-*/, а также оператор возведения в степень **.
assert.equal(2 + 2, 4)
assert.equal(5 - 25, -20)
assert.equal(3 * 4, 12)
assert.equal(5 / 10, 0.5)
assert.equal(11 ** 2, 121)

// Используется стандартный порядок приоритета операций:
// скобки, возведение в степень, умножение/деление, сложение/вычитание
assert.equal(2 + 2 * 2 ** (2 + 1), 18)

// Числа являются значащими типами, при записи числа в
// новую переменную или передаче в функцию будет создана его копия:

let number1 = 35
let number2 = number1
number2 += 5
assert.notEqual(number1, number2)

// Числа можно также объявлять в экспоненциальной нотации: <A>e<B> = A * (10 ** B)

/*>>*/ assert.equal(2e6, 2000000, 'Замените undefined на значение :)')

// Необходимо также  внимательно следить за возможными ошибками округления.
// наиболее типичная ошибка округления: 0.1 + 0.2 = 0.30000000000000004
// для сравнения чисел с плавающей точкой рекомендуется сравнивать их разность со
// встроенным значением Number.EPSILON
assert.notEqual(0.1 + 0.2, 0.3)
assert(0.1 + 0.2 - 0.3 < Number.EPSILON)

// Кроме стандартных чисел существуют также специальные значения NaN,
// Number.POSITIVE_INFINITY и Number.NEGATIVE_INFINITY
// Проверка на значение NaN не может осуществляться сравнением (в том числе через
// assert.equal/assert.notEqual), для этого необходимо использовать метод Number.isNaN

assert.equal(35 / 0, Number.POSITIVE_INFINITY)
assert.equal(-20 / 0, Number.NEGATIVE_INFINITY)
// assert.notEqual(0 / 0, NaN)
assert(Number.isNaN(0 / 0))

//==================================4. bigint=======================================
// Значение типа 'number' ограничено сверху максимально возможным целым значением Number.MAX_SAFE_INTEGER
// При использовании больших значений будет использоваться число с плавающей точкой и округлением.
// Для представления больших целых чисел может использоваться тип bigint (Node.js 10.4+)
// Для определения констант этого типа используется специальная нотация с суффиксом "n"
const veryBigInteger = 1237037402340129381232n
assert.equal(typeof veryBigInteger, 'bigint')

// 'bigint' разбивает представление в памяти на блоки, поэтому может использоваться для сколь угодно
// большого числа, но числа большего объема требуют большего времени на обработку

//==================================5. boolean======================================
// 'boolean': значение true или false. Многие операции сравнения (> < = и т.п.)
// являются выражениями, имеющими тип boolean.
assert.equal(typeof false, 'boolean')

assert.equal(2 > 1, true)
assert.equal(5 > 10, false)
assert(10 >= 10)

//  В JS/TS есть два оператора сравнения - двойное равно "==" и тройное равно "===".
// Оператор "==" автоматически осуществляет приведение типов

const zero: any = 0
assert.equal(zero == false, true)
assert.equal(zero == '0', true)

// Оператор "===" не приводит типы и всегда возвращает false, если типы операндов
// не совпадают:

/*>>*/ assert.equal(
  zero === false,
  false,
  'Замените undefined на значение :)'
)
/*>>*/ assert.equal(
  zero === '0',
  false,
  'Замените undefined на значение :)'
)

// Из-за этого "===" имеет более предсказуемое поведение, поэтому его рекоммендуется
// использовать во всех ситуациях без исключения.

// Аналогично работают операторы "!=" и "!==".

//==================================6. string======================================
// 'string' - строка.

assert.equal(typeof 'some string', 'string')

// Строки в JS/TS объявляются с использованием одинарных или двойных кавычек, либо
// с использованием синтаксиса интерполяции строк с использованием символа backtick (`).
// В текущем проекте сконфигурировано автоматическое форматирование кода, поэтому любые
// строки автоматически будут конвертированы в одинарные кавычки.
// При интерполяции можно использовать конструкцию ${} для вставки в строку какого-либо
// значения. Кроме того, в интерполируемые строки могут входить специальные символы -
// квычики, переносы строки, и т.п.

const interpolatedString = `This is a multiline string.
It includes value "${thisIsAny}" as part of it`

const theAnswerToEverything = 42

/*>>*/ const myString = `The answer to everything is 42!`
assert.equal(
  myString,
  'The answer to everything is 42!',
  'Замените `` в предыдущей строчке на значение :)'
)

// Строки являются ссылочным типом, но они неизменяемы - любая операция над строкой
// создаёт новую строку. При этом ператор === сравнивает строки по содержимому.

// Некоторые полезные методы строк:
assert.equal('Abc'.toLowerCase(), 'abc') // в нижний регистр
assert.equal('Abc'.toUpperCase(), 'ABC') // в верхний регистр
// часто требуется нечувствительное к регистру сравнине строк, для этого можно обе привести к общему регистру:
assert.equal('AbCDeF'.toLowerCase(), 'abcDEF'.toLowerCase())
assert.equal('    Abc\t  \n  \t'.trim(), 'Abc') // убрать пробельные символы в начале и конце строки
assert.deepEqual('ab,c,de,fg'.split(','), ['ab', 'c', 'de', 'fg']) // разделить в массив по разделителю

//==================================7. symbol======================================
// Символы в JS/TS используются довольно редко. Основное назначение - использование
// ссылки на конкретный символ вместо "магических строк", поскольку символы гарантированно
// уникальны на момент их создания. Символы создаются из строковых идентификаторов,
// но два различных символа с одинаковыми строковыми идентификаторами отличаются.

const symbol1 = Symbol('abc')
const symbol2 = Symbol('abc')

assert.notEqual(symbol1, symbol2)

//==================================8. object======================================
// 'object' - объект, массив или любой другой нефункциональный тип.

// объекты в JS/TS являются парами "ключ-значение". В объекте может быть объявлено
// любое число "свойств", которые могут иметь свой тип.
// Обратите внимание, что объект объявлен при помощи "const", но его можно модифицировать
// по ссылке (добавлять или перезаписывать его свойства)

const someObject: any = {}
someObject.foo = 12
someObject.foo = 5
someObject.bar = 'str'
assert.equal(typeof someObject, 'object')
assert.equal(typeof someObject.foo, 'number')
assert.equal(typeof someObject.bar, 'string')

// Свойства объектов являются, по сути, значениями со строковыми ключами. Для
// доступа к свойству по его имени в виде строки используется оператор []:
assert.equal(someObject.foo, someObject['foo'])
const barString = 'bar'
assert.equal(someObject.bar, someObject[barString])

// С помощью точечной нотации можно обращаться только к тем свойствам, имена которых
// являются корректными идентификаторами. С помощью оператора [] можно обращаться
// к свойству с любым названием:
someObject['non-valid-identifier'] = 50
const nonValidIdentifierString = 'non-valid-identifier'
assert.equal(
  someObject['non-valid-identifier'],
  someObject[nonValidIdentifierString]
)

// Объекты являются ссылочными типами. При присваивании объекта другой переменной или
// передаче его в функцию сам объект не копируется, вместо этого создаётся новая ссылка:

const theSameObject = someObject
assert.equal(theSameObject.foo, 5)
theSameObject.foo = 10
assert.equal(someObject.foo, 10)

// Оператор === всегда сравнивает два объекта по ссылке:
assert.equal(someObject === theSameObject, true)

// При объявлении объектов его свойства и их значения можно описывать с помощью синтаксиса
// объявления объекта {} . В качестве ключа в такой нотации можно использовать любые
// строковые идентификаторы:
const someOtherObject = {
  foo: 10,
  bar: 'str',
  'non-valid-identifier': 50
}

// Даже если объекты совпадают, === вернёт true только в случае наличия ссылки на
// один и тот же объект:
assert.notEqual(someObject, someOtherObject)

// Для "глубокого" сравнения объектов и массивов здесь и далее будем использовать assert.deepEqual
assert.deepEqual(someObject, someOtherObject)

// Объекты часто используются в качестве ассоциативных массивов (пар ключ-значение)
// для хранения некоторой информации. При этом в качестве ключа могут выступать только
// строки - любые другие типы при попытке использования в качестве
// ключа будут автоматически приведены к строке, поэтому их лучше не использовать.

// Кроме объектов, тип 'object' в JavaScript также имеет значение null, а также массивы и
// более сложные объекты, созданные при помощи конструкторов:

assert.equal(typeof null, 'object')
assert.equal(typeof [1, 2, 3], 'object')
assert.equal(typeof new Map(), 'object')

// Для проверки на массив существует метод Array.isArray:
assert(Array.isArray([1, 2, 3]))
assert.equal(Array.isArray(someObject), false)

// Для проверки на экземпляр класса или класса-наследника может использоваться оператор instanceof
assert({} instanceof Object)
assert(new Map() instanceof Object)
assert(new Map() instanceof Map)

// Метод Object.keys возвращает массив строковых и числовых ключей объекта:
const myAwesomeObject: any = {}
myAwesomeObject.foo = '123'
myAwesomeObject[35] = '456'
myAwesomeObject['bar-bar'] = '789'

assert.equal(myAwesomeObject['35'], myAwesomeObject[35])

// Если значение по ключу не определено или не объявлено, оно будет иметь значение undefined:
assert.equal(typeof myAwesomeObject.nonExistingProperty, 'undefined')

// Обратите внимание: порядок следования ключей в объекте в общем случае не определен.
assert.deepEqual(Object.keys(myAwesomeObject), ['35', 'foo', 'bar-bar'])

// В TypeScript через двоеточие можно определять наличие и тип свойств объектов:
// Тип {foo: string} означает, что это объект со свойством foo, имеющим тип string
const objectWithFooString: {foo: string} = {
  foo: 'abc'
}

// Если не указать тип объекта явно или указать any, его тип будет выведен из объявления:
const anotherObjectWithFooString = {
  foo: 'abc'
}

anotherObjectWithFooString.foo = 'bar'
// Следующая строка вызовет ошибку, т.к. у типа {foo: string} свойство foo имеет тип string:
// anotherObjectWithFooString.foo = 5 // Type '5' is not assignable to type 'string'

// Следующая строка вызовет ошибку, т.к. у типа {foo: string} нет свойства bar:
// anotherObjectWithFooString.bar = 5 // Property 'bar' does not exist on type '{ foo: string; }'

// Объекты поддерживают синтаксис "деструктуризации" - автоматического присваивания переменным
// значений из объекта по их имени:
const {foo, bar} = myAwesomeObject
// строчка выше эквивалентна этим двум строчкам:
// const foo = myAwesomeObject.foo
// const bar = myAwesomeObject.bar

// При деструктуризации можно давать свойствам объекта другое имя
const anotherObject = {
  baz: 1,
  foobar: 'str'
}

const {baz, foobar: renamedFoobar} = anotherObject
// строчка выше эквивалентна этим двум строчкам:
// const baz = anotherObject.baz
// const renamedFoobar = anotherObject.foobar

// В отличие от объектов, массивы являются парами ключ-значение с численными ключами и
// произвольными значениями. Индексация в массивах оператором [] начинается с нуля:

const array1 = []
const array2 = [1, 'two', {value: 'three'}]
assert.equal(array2[1], 'two')

// Массивы также поддерживают синтаксис деструктуризации - автоматического присваивания
// нескольким переменным значений из массива в порядке их следования:
const [one, two, three] = array2
// эквивалентно записи:
// const one = array2[0]
// const two = array2[1]
// const three = array2[2]

assert.equal(one, 1)
assert.equal(two, 'two')
assert.equal(three, array2[2])

// У каждого массива есть числовое свойство 'length', содержащее его длину.
assert.equal(array1.length, 0)
/*>>*/ assert.equal(
  array2.length,
  3,
  'Замените undefined на значение :)'
)

// Обратите внимание - массивы в JS/TS можно не выделять заранее,
// и в них по определению отсутствует ошибка "выхода за границы" массива.
// При чтении по индексу, который превышает его длину, будет получено значение undefined:

assert.equal(array1[50], undefined)

// При записи по индексу, который превышает его длину, массив будет расширен до
// необходимой длины; при этом добавленное "пустое место" будет для любого индекса
// иметь значение undefined, пока его не перезаписать.
array1[3] = true
assert.equal(array1[3], true)
assert.equal(array1.length, 4)
assert.equal(array1[2], undefined)

// Обратите внимание: хотя массив с "пустым местом" и массив с явно указанными значениями undefined
// ведут себя абсолютно одинаково, они, в общем случае, не эквивалентны:
assert.notDeepEqual([undefined, undefined, undefined, true], array1)

// При изменении размера массива происходит перераспределение памяти, что может сказаться
// на производительности. Если заранее известен размер массива, его можно передать в конструктор
// Array для инициализации массива заранее выделенного размера:

const preallocatedArray = new Array(100)
assert.equal(preallocatedArray.length, 100)

// Некоторые полезные методы массивов:
const anotherArray = [1, 2]
anotherArray.push(3) // добавить элемент(ы) в конец
assert.deepEqual(anotherArray, [1, 2, 3])
anotherArray.unshift(0) // добавить элемент(ы) в начало
assert.deepEqual(anotherArray, [0, 1, 2, 3])
const commaSeparated = anotherArray.join(',') // трансформировать элементы в строки и "склеить" их с разделителем
assert.equal(commaSeparated, '0,1,2,3')

//=============================8. function===============================

// Функции могут быть описаны при помощи ключевого слова function с указанием имени:

function sum(x, y) {
  return x + y
}

assert.equal(typeof sum, 'function')

// Вызов функции осуществляется при помощи оператора "скобки" с передачей аргументов
assert.equal(sum(2, 2), 4)

// Кроме этого, функции могут быть безымянными:
const myObjectWithMethod: any = {}
myObjectWithMethod.someFunction = function() {
  return 5
}

assert.equal(myObjectWithMethod.someFunction(), 5)

// Функции можно присваивать переменным или свойствам объекта (как выше), передавать в другие
// функции или возвращать из других функций, в общем виде они ничем не отличаются от других значений.
// Функции, являющиеся свойствами какого-либо объекта, также называют методами этого объекта. Например,
// у объекта myObjectWithMethod выше объявлен метод (т.е. свойство, являющееся функцией) someFunction

// В JavaScript отсутствует строгая проверка на количество аргументов. Если в функцию
// передать меньшее число аргументов, чем в ней объявлено, остальные аргументы будут иметь
// значение undefined:
const returnSecondArgument: any = function(x, y) {
  return y
}
assert.equal(returnSecondArgument(), undefined)

// Тем не менее, такая проверка присутствует в TypeScript. Если параметр является необязательным,
// можно указать его значение по умолчанию:
function returnSecondArgumentWithDefault(x, y = 'optional') {
  return y
}
assert.equal(returnSecondArgumentWithDefault(5), 'optional')
assert.equal(returnSecondArgumentWithDefault(5, 'foo'), 'foo')

// Поскольку функции не отличаются от обычных значений, в JS можно реализовывать функции высшего
// порядка - такие функции, которые принимают другую функцию в качестве аргумента, или возвращают
// функцию в качестве своего результата:
function createFunctionThatReturns(x) {
  return function() {
    return x
  }
}

const functionThatReturnsFive = createFunctionThatReturns(5)
assert.equal(typeof functionThatReturnsFive, 'function')
assert.equal(functionThatReturnsFive(), 5)

function callAndReturnPlusOne(innerFunction) {
  return innerFunction() + 1
}

assert.equal(callAndReturnPlusOne(functionThatReturnsFive), 6)

// Функции могут являться конструкторами - в этом случае принято их называть с большой
// буквы. В рамках наших лабораторных мы не будем вручную создавать конструкторы,
// вместо этого будем использовать только конструкторы классов. Тем не менее, следует
// помнить, что любую функцию можно вызвать как конструктор с помощью ключевого слова new:
const functionThatReturnsNothing = function() {}

// В зависимости от реализации функции это может приводить к разным возвращаемым значениям.
// Из-за этого вызывать как конструктор мы будем только конструкторы классов.
const somethingWeird = new functionThatReturnsNothing()
assert.equal(typeof somethingWeird, 'object') // объект? но ведь эта функция ничего не возвращает?..

// Каждая функция имеет доступ к this - объекту, на котором эта функция была вызвана
// как метод. Семантика работы this довольно сложная, в рамках наших лабораторных
// мы будем использовать this только в объявлениях классов.

// Существует сокращенный синтаксис объявления функций - стрелочные функции
// (fat arrow notation). В отличие от обычных функций, стрелочные функции всегда
// анонимны, не могут быть вызваны как конструктор и по-другому работают с this:

const arrowFunctionThatReturnsNothing = () => {}
// new arrowFunctionThatReturnsNothing() // ошибка: arrowFunctionThatReturnsNothing is not a constructor

const arrowFunctionSum = (x, y) => {
  return x + y
}

// Если тело стрелочной функции состоит только из выражения return, тело функции {} и
// ключевое слово return можно опустить:

const oneLineFunctionSum = (x, y) => x + y

// Если у стрелочной функции только один аргумент, скобки вокруг него также можно опустить:

const addOne = x => {
  return x + 1
}

const oneLineAddOne = x => x + 1

// В TypeScript можно явно указывать тип параметров и тип возвращаемого значения функции, в
// противном случае параметры имеют тип any:
function typedSum(x: number, y: number): number {
  return x + y
}

assert.equal(sum('a', 'b'), 'ab')
// typedSum('a', 'b') // Argument of type '"a"' is not assignable to parameter of type 'number'

// При этом тип возвращаемого значения, как правило, может быть выведен автоматически:
const returnSomeString = () => 'some string'
let someString = returnSomeString() // someString автоматически имеет тип string
// someString = 5 // Type '5' is not assignable to type 'string'

// Для описания типов самих функций в typescript используется нотация, похожая на объявление
// стрелочной функции:
let fn: (x: number, y: number) => number // fn имеет тип "функция, принимающая 2 числа, и возвращающая число"

// при этом TypeScript автоматически распознаёт функции, которые являются совместимыми по типам:
fn = typedSum // полностью совместимы
fn = oneLineFunctionSum // совместимы, т.к. функция, принимающая any, может принимать и number
fn = x => x + 1 // совместимы, т.к. функция может принимать меньшее число аргументов, лишние будут проигнорированы
// fn = functionThatReturnsNothing // несовместимы, т.к. функция должна возвращать number, а не возвращает ничего

// Некоторые интересные функции высшего порядка на массивах:
// map: проекция - применить к каждому элементу функцию и создать массив с новыми значениями:
const numbers = [1, 2, 3]
assert.deepEqual(
  numbers.map(x => x * 2),
  [2, 4, 6]
)
assert.deepEqual(
  numbers.map(x => x ** 2),
  [1, 4, 9]
)
// filter: фильтрация - вернуть новый массив, в котором убраны элементы, для которых функция возвращает false:
assert.deepEqual(
  numbers.filter(x => x <= 2),
  [1, 2]
)
assert.deepEqual(
  numbers.filter(x => x % 2 !== 0), // x % 2 - остаток от деления на 2, x % 2 !== 0 true для нечетного числа
  [1, 3]
)
// reduce: аггрегация - преобразовать массив в значение, аккумулировав его поэлементно:
assert.equal(
  // accumulator - текущее значение аккумулятора
  // nextValue - очередной элемент массива
  // после прохода очередного значения новое значение аккумулятора - accumulator + nextValue,
  // т.е. такая аггрегация реализует суммирование всех элементов массива
  numbers.reduce((accumulator, nextValue) => accumulator + nextValue),
  6
)
// 2-й необязательный аргумент reduce - начальное значение аккумулятора:
assert.deepEqual(
  numbers.reduce((accumulator, nextValue) => {
    accumulator.unshift(nextValue)
    return accumulator
  }, []),
  [3, 2, 1]
)
// если в reduce не передать 2-й аргумент, в качестве начального значения аккумулятора используется первый элемент,
// а функция, переданная в reduce, вызывается начиная со второго элемента.

//===================================Классы======================================

// Классы в JS объявляются при помощи ключевого слова class. Внутри объявления класса
// можно указывать конструктор, а также поля и методы. Конструктор класса объявляется как
// метод с названием "constructor". В пределах методов класса this является ссылкой на
// отдельный экземпляр.

// В TypeScript все поля класса должны быть объявлены явно. Кроме того, у них могут
// быть указаны модификаторы доступа public/private/protected

class Foo {
  public foo: string

  constructor(foo: string) {
    this.foo = foo
  }

  returnFoo() {
    return this.foo
  }
}

// Объявление класса всегда является функцией:
assert.equal(typeof Foo, 'function')

// Для создания экземпляра класса функция вызывается как конструктор с оператором new,
// в неё передаются все аргументы, которые указаны в конструкторе:
const fooInstance = new Foo('bar')

// Все экземпляры любого класса имеют тип 'object':
assert.equal(typeof fooInstance, 'object')

// Как уже упоминалось, для проверки принадлежности классу можно использовать оператор instanceof:
/*>>*/ assert(fooInstance instanceof Foo, 'Замените Map на корректный тип :)')

// Наследование реализуется при помощи ключевого слова extends.
// Если класс-наследник не включает в себя конструктор, вместо него автоматически используется
// конструктор класса-родителя. В противном случае, в конструкторе класса-наследника должен
// присутствовать вызов конструктора родителя при помощи оператора super().
// Поскольку JS реализует динамическую типизацию, как таковой необходимости в полиморфизме
// нет - в качестве экземпляра класса Foo может подойти любой объект со свойством-функцией
// returnFoo, поэтому классы-наследники, для реализации полиморфного поведения, могут просто
// реализовать метод с таким же именем, как и в родителе:
class Bar extends Foo {
  constructor() {
    super('bar')
  }

  returnFoo() {
    return 'this is bar, not foo!'
  }
}

const barInstance = new Bar() // конструктор Bar уже без аргументов
assert.equal(barInstance.returnFoo(), 'this is bar, not foo!')
assert.equal(barInstance.foo, 'bar')
assert(barInstance instanceof Bar)
// instanceof работает для всей иерархии наследования:
assert(barInstance instanceof Foo)

// кроме того, все объекты также в иерархии имеют конструктор Object:
assert(barInstance instanceof Object)

//================================Множества Set и словари Map==========================
// Set - набор из уникальных неповторяющихся значений
const set = new Set([1, 2, 3, 3, 4, 4, 4, 1, 1, 2, 2])
// свойство size - количество элементов множества
assert.equal(set.size, 4)
set.add(2)
/*>>*/ assert.equal(set.size, 4, 'Замените undefined на значение :)')
set.add(5)
/*>>*/ assert.equal(set.size, 5, 'Замените undefined на значение :)')

// Map - множество пар "ключ-значение" (хэш-таблица)
const map = new Map<any, any>([
  ['one', 1],
  ['two', 2],
  [3, 3],
  ['3', 'three']
])

assert.equal(map.get('one'), 1)
assert.equal(map.get('nonExisting'), undefined)

// В отличие от объектов, Map не приводит все ключи к строкам:
assert.notEqual(map.get(3), map.get('3'))

//================================циклы и контроль управления==========================

// if/else:
if (true) {
  assert(true)
} else {
  // сюда никогда не попадём
  assert(false)
}

// цикл for:
let accumulator = 0
for (let i = 0; i < 10; i++) {
  accumulator += i
}
assert.equal(accumulator, 45)

// цикл for-of служит для перебора любого значения, поддерживающего итерацию
// итерацию поддерживают (в том числе и) массивы, строки, множества Set, словари Map
const reversedSymbols = []
for (const symbol of 'string') {
  reversedSymbols.unshift(symbol)
}
/*>>*/ assert.equal(
  reversedSymbols.join(''),
  'gnirts',
  'Замените undefined на значение :)'
)

const map2 = new Map([
  [1, 'one'],
  [2, 'two']
])

for (const [key, value] of map2) {
  if (key === 1) {
    assert.equal(value, 'one')
  } else if (key === 2) {
    assert.equal(value, 'two')
  }
}

// ===============================Кое-что про типы в TypeScript=====================
// Типы можно описывать локально при объявлении переменных:
const yetAnotherObjectWithFooString: {foo: string} = {foo: 'abc'}

// Иногда типы слишком сложны, или их нужно использовать в нескольких местах. Поэтому можно
// ввести псевдоним для типа при помощи объявления type:
type ObjectWithFooString = {foo: string}
const andAnotherObjectWithFooString: ObjectWithFooString = {foo: 'def'}

// Типы в TypeScript могут быть составными (union type, логическое ИЛИ):
type NumberOrString = number | string
let foobar: NumberOrString = 'abc'

// Объектные типы также могут быть описаны как интерфейсы:
interface ObjectWithFooStringInterface {
  foo: string
}

// такое описание эквивалентно типам type,

// объектные типы type и интерфейсы interface могут использоваться при объявлении
// класса с ключевым словом implements, чтобы заставить все экземпляры этого класса также
// удовлетворять этому типу:
class FooBar implements ObjectWithFooString {
  foo: string
  constructor(foo: string) {
    this.foo = foo
  }
}
const foobarInstance: ObjectWithFooStringInterface = new FooBar('foobar')

// Если по потоку управления проверяется какой-либо признак принадлежности к одному из типов,
// TypeScript выводит его автоматически:

function processNumberOrString(value: NumberOrString) {
  if (typeof value === 'string') {
    // в этот блок можно попасть только в том случае, если foobar - строка, поэтому на foobar доступны все методы строк
    assert(value.toUpperCase(), 'ABC')
  }
}

processNumberOrString(foobar)

// Часто в качестве признака отличия двух объектных типов выступает какая-либо строка (discriminated union):
type GetUsersResult =
  | {type: 'notFound'}
  | {type: 'error'; errorDescription: string}
  | {type: 'found'; user: {id: number; name: string}}

function processUserResult(result: GetUsersResult) {
  if (result.type === 'notFound') {
    return undefined
  } else if (result.type === 'error') {
    // тут доступно свойство errorDescription
    return result.errorDescription
  } else if (result.type === 'found') {
    // тут доступно свойство user
    return `Found user id ${result.user.id} ${result.user.name}`
  }
}

assert.equal(processUserResult({type: 'notFound'}), undefined)
/*>>*/ assert.equal(
  processUserResult({type: 'error', errorDescription: 'Ошибка!'}),
  'Ошибка!',
  'Замените undefined на значение :)'
)
/*>>*/ assert.equal(
  processUserResult({type: 'found', user: {id: 3, name: 'Test User'}}),
  'Found user id 3 Test User',
  'Замените undefined на значение :)'
)

console.log('Сценарий завершился успешно!')
