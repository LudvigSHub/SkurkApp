const express = require('express');

const router = express.Router();

const { registerUser, loginUser, getCurrentUser } = require('../controllers/userController');

// POST LOGIN
router.route('/login').post(loginUser);

// POST REGISTER
router.route('/register').post(registerUser);

// GET CURRENT USER
router.route('/current').get(getCurrentUser);

module.exports = router;