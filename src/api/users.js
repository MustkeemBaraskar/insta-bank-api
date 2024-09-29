const getAccountBalance = require('../controllers/accountController');
const express = require("express");

const router = express.Router();


router.post("/get-balance", getAccountBalance);

module.exports = router;
