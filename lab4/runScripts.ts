const path = require('path');
const { spawn } = require('child_process');

// Указываем путь к npx.cmd вручную
const npxPath = path.join(process.env.APPDATA, 'npm', 'npx.cmd');

// Проверяем, существует ли npxPath
const fs = require('fs');
if (!fs.existsSync(npxPath)) {
  console.error(`Файл npx.cmd не найден по пути: ${npxPath}`);
  process.exit(1);
}

// Функция для запуска команд
function runScript(command, args) {
  return new Promise((resolve, reject) => {
    const process = spawn(command, args, { stdio: 'inherit' });

    process.on('close', (code) => {
      console.log(`${args.join(' ')} завершён с кодом ${code}`);
      resolve(code);
    });

    process.on('error', (err) => {
      console.error(`Ошибка выполнения команды ${command}:`, err);
      reject(err);
    });
  });
}

(async () => {
  try {
    // Запуск producer.ts
    console.log('Запускаем producer.ts...');
    await runScript(npxPath, ['ts-node', 'producer.ts']);

    // Запуск faultyConsumer.ts
    console.log('Запускаем faultyConsumer.ts...');
    await runScript(npxPath, ['ts-node', 'faultyConsumer.ts']);
  } catch (error) {
    console.error('Ошибка при выполнении скриптов:', error);
  }
})();
