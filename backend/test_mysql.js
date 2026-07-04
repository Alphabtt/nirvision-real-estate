const mysql = require('mysql2/promise');

async function testConnection(password) {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: password,
    });
    console.log(`SUCCESS with password: '${password}'`);
    await connection.end();
    return true;
  } catch (error) {
    console.log(`FAILED with password: '${password}' - ${error.message}`);
    return false;
  }
}

async function main() {
  const passwords = ['', 'root', 'password', '1234', '123456', 'admin'];
  for (const p of passwords) {
    if (await testConnection(p)) {
      console.log('---');
      console.log(`VALID_PASSWORD=${p}`);
      process.exit(0);
    }
  }
  console.log('---');
  console.log('NO_VALID_PASSWORD_FOUND');
  process.exit(1);
}

main();
