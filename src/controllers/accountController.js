
const { db } = require('../config/admin-sdk');

const getAccountBalance = async (req, res) => {
  try {
    const { id, upiPassword } = req.body;
    const userSnapshot = await db.collection("users").doc(id).get();
    if (!userSnapshot.exists) {
      return res.status(404).json({ error: "User not found" });
    }
    const userData = userSnapshot.data();
    if (userData.upiPassword !== upiPassword) {
      return res.status(401).json({ error: "Wrong UPI PIN" });
    }
    const accountBalance = userData["Account Balance"];
    res.status(200).json({ message: "UPI PIN verified", accountBalance });
  } catch (err) {
    console.error("Error fetching account balance: ", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = getAccountBalance;
