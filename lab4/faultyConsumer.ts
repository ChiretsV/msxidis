import { Connection, Message } from 'amqp-ts';

function delay(ms: any) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const connection = new Connection('amqp://localhost');
  const queue = connection.declareQueue('queue', { durable: true });

  queue.prefetch(1);

  await connection.completeConfiguration();

  await queue.activateConsumer(async message => {
    const content = message.getContent();
    console.log('Получено сообщение', content);

    if (content.number > 10) {
      console.error('Ошибка обработки сообщения', content);
      message.nack();
    } else {
      await delay(2000);
      message.ack(); 
      console.log('Сообщение подтверждено');
    }
  });
}

main();
