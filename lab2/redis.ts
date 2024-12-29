import { createHandyClient as createClient } from 'handy-redis';
import assert from 'assert';

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function demonstrateDataTypes(publisherClient: ReturnType<typeof createClient>): Promise<void> {
  console.log('Строки:');
  await publisherClient.set('stringKey', 'Hello, Redis!');
  const stringValue = await publisherClient.get('stringKey');
  console.log(`Значение строки: ${stringValue}`); 
  await publisherClient.publish('channel1', `String: ${stringValue}`);

  console.log('Списки:');
  await publisherClient.lpush('listKey', 'value1', 'value2', 'value3');
  const listValues: string[] = await publisherClient.lrange('listKey', 0, -1);
  console.log(`Значения списка: ${listValues.join(', ')}`);
  await publisherClient.publish('channel1', `List: ${listValues.join(', ')}`);

  console.log('Set:');
  await publisherClient.sadd('setKey', 'value1', 'value2', 'value3', 'value2');
  const setValues: string[] = await publisherClient.smembers('setKey');
  console.log(`Значения множества: ${setValues.join(', ')}`);
  await publisherClient.publish('channel1', `Set: ${setValues.join(', ')}`);

  console.log('Sorted Set:');
  await publisherClient.zadd('sortedSetKey', [1, 'value1'], [3, 'value3'], [2, 'value2']);
  const sortedSetValues: string[] = await publisherClient.zrange('sortedSetKey', 0, -1, 'WITHSCORES');
  console.log('Значения сортированного множества (с весами):');
  for (let i = 0; i < sortedSetValues.length; i += 2) {
    const value = sortedSetValues[i];
    const score = sortedSetValues[i + 1];
    console.log(`Элемент: ${value}, Вес: ${score}`);
    await publisherClient.publish('channel1', `SortedSet: ${value}, Score: ${score}`);
  }

  console.log('Hash:');
  await publisherClient.hset('hashKey', 'field1', 'value1');
  await publisherClient.hset('hashKey', 'field2', 'value2');
  const hashValues = await publisherClient.hgetall('hashKey');
  console.log('Значения хэша:');
  Object.entries(hashValues).forEach(([field, value]) => {
    console.log(`Поле: ${field}, Значение: ${value}`);
    publisherClient.publish('channel1', `Hash: ${field}=${value}`);
  });
}

async function main() {
  const client = createClient({
    host: 'localhost',
    port: 7000,
  });

  await client.set('key1', 'value1');
  const value = await client.get('key1');
  assert.equal(value, 'value1');

  client.redis.on('message', (channel, message) => {
    console.log(`${channel}: ${message}`);
  });

  await client.subscribe('channel1');

  const publisherClient = createClient({
    host: 'localhost',
    port: 7000,
  });

  for (let i = 0; i < 10; i++) {
    await publisherClient.publish('channel1', `Hello world #${i}`);
    await delay(200);
  }

  await demonstrateDataTypes(publisherClient);

  await client.unsubscribe();
  await client.quit();
  await publisherClient.quit();

  return 0;
}

main().then(process.exit);
