const { auth, db, signInWithEmailAndPassword, createUserWithEmailAndPassword } = require('../config/firebaseConfig'); // Adjust the path as needed
const { registerSchema, loginSchema} = require('../models/authModel')



// Register User
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
    await db.collection("EmployeeData").doc(user.user.uid).set(userData);
    res.status(201).json({ message: "User registered successfully", user, userData });
  } catch (err) {
    console.error("Firebase error: ", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Login User
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = loginSchema.validate({ email, password });
    if (error) return res.status(400).json({ error: error.details[0].message });

    // Correct way to sign in
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.error("Firebase error: ", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { register, login };
