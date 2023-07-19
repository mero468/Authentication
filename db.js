const Pool = require('pg').Pool;

const poolConfig = {
  host: 'localhost',
  user: 'postgres',
  password: 'kkmobil',
  database: 'jwttutorial',
  port: 5432,
};

const pool = new Pool(poolConfig);


module.exports = pool;
