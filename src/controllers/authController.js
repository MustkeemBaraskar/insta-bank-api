const pool = require('../config/pgdatabase');
const { registerSchema } = require('../models/authModel');
const { loginSchema } = require('../models/authModel');
const bcrypt = require('bcrypt');

const saltRounds = 10;


const register = async (req, res) => {
  try {
    const { userName, phoneNumber, branch, email, password, upiPassword } = req.body;
    const { error } = registerSchema.validate({ userName, phoneNumber, branch, email, password, upiPassword });
    if (error) return res.status(400).json({ error: error.details[0].message });
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const accountBalance = Math.floor(Math.random() * (754862 - 100000 + 1)) + 100000;
    const query = `
      INSERT INTO users (username, email, phone_number, branch, account_balance, upi_password, password)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
    const values = [userName, email, phoneNumber, branch, accountBalance, upiPassword, hashedPassword];
    const result = await pool.query(query, values);
    const userData = result.rows[0];
    res.status(201).json({ message: "User registered successfully", userData });
  } catch (err) {
    console.error("Database error: ", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const { error } = loginSchema.validate({ userName, password });
    if (error) return res.status(400).json({ error: error.details[0].message });
    const result = await pool.query('SELECT * FROM users WHERE username = $1 LIMIT 1', [userName]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const userData = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, userData.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Incorrect password" });
    }
    res.status(200).json({ message: "Login successful", userData });
  } catch (err) {
    console.error("Database error: ", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = { register, login };
