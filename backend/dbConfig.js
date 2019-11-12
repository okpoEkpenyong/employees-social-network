const {Pool} = require('pg');

const pool = new Pool({
    user: 'okpo',
    host: 'localhost',
    database: 'EmployeeDB',
    password: 'vict123',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    port: 5432                  
});

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
  })

module.exports = pool;