import cassandra from 'cassandra-driver';

const KEYSPACE_NAME = 'test';

const denormalizedTableSchema = {
  'users_by_username': [
    'username text PRIMARY KEY', 
    'id int',
    'email text',
    'address text'
  ],
  'users_by_email': [
    'email text PRIMARY KEY', 
    'id int',
    'username text',
    'address text'
  ]
};

async function createTables(client: cassandra.Client) {
  const schema = { ...denormalizedTableSchema };
  for (const tableName of Object.keys(schema)) {
    const table = await client.metadata.getTable(KEYSPACE_NAME, tableName);
    if (!table) {
      const columns = schema[tableName];
      await client.execute(`CREATE TABLE ${tableName} (${columns.join(',')})`);
      console.log(`Таблица ${tableName} создана.`);
    } else {
      console.log(`Таблица ${tableName} уже существует.`);
    }
  }
}

async function main() {
  const authProvider = new cassandra.auth.PlainTextAuthProvider(
    'cassandra',
    'cassandra'
  );
  const client = new cassandra.Client({
    contactPoints: ['localhost'],
    authProvider,
    localDataCenter: 'datacenter1'
  });

  // client.on('log', (level, className, message) => {
  //   console.log(`log event: ${level} - ${className} - ${message}`);
  // });

  try {
    await client.connect();
    console.log('Успешное подключение к Cassandra!');

    const keyspaces = client.metadata.keyspaces;
    if (typeof keyspaces[KEYSPACE_NAME] === 'undefined') {
      await client.execute(
        `CREATE KEYSPACE ${KEYSPACE_NAME} 
          WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1}`
      );
      console.log(`Ключевое пространство ${KEYSPACE_NAME} создано.`);
    } else {
      console.log(`Ключевое пространство ${KEYSPACE_NAME} уже существует.`);
    }

    await client.execute(`USE ${KEYSPACE_NAME}`);
    console.log(`Переключились на ключевое пространство ${KEYSPACE_NAME}.`);

    await createTables(client);

  } catch (error) {
    console.error('Ошибка при работе с Cassandra:', error);
  } finally {
    await client.shutdown();
    console.log('Клиент Cassandra успешно завершил работу.');
  }
}

main().catch((error) => {
  console.error('Произошла ошибка при выполнении программы:', error);
});
