const { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } = require('../config/firebaseConfig');
const {db} = require('../config/admin-sdk');
const {Timestamp} = require('firebase-admin/firestore');
const { registerSchema, loginSchema} = require('../models/authModel')




const register = async (req, res) => {
  try {
    const { userName, phoneNumber, branch, email, password, upiPassword } = req.body;
    const { error } = registerSchema.validate({ userName, phoneNumber, branch, email, password, upiPassword });
    if (error) return res.status(400).json({ error: error.details[0].message });
    const user = await createUserWithEmailAndPassword(auth, email, password);
    const userData = {
      "uid": user.user.uid,
      "User Name": userName,
      "Email": email,
      "Phone Number": phoneNumber,
      "Branch": branch,
      "Bank Account Type": "Savings Account",
      "Bank Name": "Insta Bank",
      "Account created at": Timestamp.now(),
      "Account Balance": Math.floor(Math.random() * (754862 - 100000 + 1)) + 100000,
      "upiPassword": upiPassword
    };
    await db.collection("users").doc(user.user.uid).set(userData);
    res.status(201).json({ message: "User registered successfully", user, userData });
  } catch (err) {
    console.error("Firebase error: ", err.message);
    res.status(500).json({ error: err.message });
  }
};



const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const { error } = loginSchema.validate({ userName, password });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const userSnapshot = await db.collection("users")
      .where("User Name", "==", userName)
      .limit(1)
      .get();
    if (userSnapshot.empty) {
      return res.status(404).json({ error: "User not found" });
    }
    const userData = userSnapshot.docs[0].data();
    const email = userData.Email;
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    res.status(200).json({ message: "Login successful", userData });
  } catch (err) {
    console.error("Firebase error: ", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = { register, login };
