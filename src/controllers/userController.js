const { merge } = require("../api/v1/auth");
const userSchema = require("../models/userModel");
const {db} = require('../config/db');
const joi = require('joi');



const getClientProfile = async (req, res) => {
    try {
        const userRef = db.collection('users').doc(req.uid);
        const doc = await userRef.get();
        if (!doc.exists) {
            return res.status(404).json({error: 'User profile not found' });
        }
        res.status(200).json(doc.data());
    } catch (err) {
        return res.status(500).json({error: err.message });
    }
};

module.exports = {addUserProfile, getClientProfile}