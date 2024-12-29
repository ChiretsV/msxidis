import {Connection, Message} from 'amqp-ts'

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function main() {
  const connection = new Connection('amqp://localhost')
  // Exchange ("станция")- логическая группа очередей, которые могут быть разделены по
  // отдельным репликам отказоустойчивого кластера RabbitMQ. declareExchange объявляет
  // станцию с таким именем - подключается к существующей или создаёт новую.
  // Все сообщения отправляются в Exchange, после чего по внутренним правилам маршрутизации
  // выбирается какая-либо очередь для передачи этого сообщения - таким образом, отдельным
  // сообщениям может быть присвоен более высокий приоритет.
  const exchange = connection.declareExchange('exchange')
  
  // Queue - очередь, которая может быть привязана к конкретной станции. durable очереди
  // поддерживают дополнительно репликацию на жёсткий диск, поэтому все сообщения очереди
  // "переживают" выход из строя отдельных узлов кластера, либо всего кластера целиком.
  const queue = connection.declareQueue('queue', {durable: true})

  // bind привязывает очеердь к конкретной станции
  queue.bind(exchange)

  await connection.completeConfiguration()

  while (true) {
    const randomNumber = Math.floor(Math.random() * 100)
    const content = {
      text: 'Hello world!',
      number: randomNumber
    }
    console.log(`Отправка сообщения: ${JSON.stringify(content)}`)
    exchange.send(new Message(content))
    await delay(1000)
  }

  return 0
}

main().then(process.exit)