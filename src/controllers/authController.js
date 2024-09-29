const { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } = require('../config/firebaseConfig');
const {db} = require('../config/admin-sdk');
const { registerSchema, loginSchema} = require('../models/authModel')




const register = async (req, res, next) => {
  try {
    const { userName, phoneNumber, branch, email, password } = req.body;
    const { error } = registerSchema.validate({ userName, phoneNumber, branch, email, password });
    if (error) return res.status(400).json({ error: error.details[0].message });
    const userData = {
      "User Name": userName,
      "Email": email,
      "Phone Number": phoneNumber,
      "Branch": branch
    };
    const user = await createUserWithEmailAndPassword(auth, email, password);
    await db.collection("users").doc(user.user.uid).set(userData);
    res.status(201).json({ message: "User registered successfully", user, userData });
  } catch (err) {
    console.error("Firebase error: ", err.message);
    res.status(500).json({ error: err.message });
  }
};



const login = async (req, res, next) => {
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
    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.error("Firebase error: ", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = { register, login };
