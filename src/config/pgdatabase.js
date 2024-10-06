const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.connect((err) => {
  if (err) {
    console.error('Error connecting to the PostgreSQL database:', err.stack);
  } else {
    console.log('Connected to PostgreSQL database successfully');
  }
});



module.exports = pool;
