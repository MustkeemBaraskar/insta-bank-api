const pool = require('../config/pgdatabase');

const getAccountBalance = async (req, res) => {
  try {
    const { id, upiPassword } = req.body;

    const result = await pool.query('SELECT * FROM users WHERE uid = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const userData = result.rows[0];

    if (userData.upi_password !== upiPassword) {
      return res.status(401).json({ error: "Wrong UPI PIN" });
    }

    res.status(200).json({ message: "UPI PIN verified", accountBalance: userData.account_balance });
  } catch (err) {
    console.error("Error fetching account balance: ", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = getAccountBalance;


module.exports = getAccountBalance;
