const { Pool } = require('pg');
require('dotenv').config();


const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

pool.connect((err)=>{
    if(err) throw err
    console.log("connection to postgree is successfull");
})


module.exports = pool;

const createUsersTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    uid SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    branch VARCHAR(100) NOT NULL,
    account_balance NUMERIC(12, 2) DEFAULT 0 NOT NULL,
    password TEXT NOT NULL,
    upi_password TEXT NOT NULL
  );
`;

pool.query(createUsersTableQuery)
  .then(() => console.log("Users table created successfully"))
  .catch((err) => console.error("Error creating users table", err));
