 
const express = require("express");
const userController = require("../../controllers/clientController");

const router = express.Router();

// User registration
router.post("/register", userController.addUser);

module.exports = router;
