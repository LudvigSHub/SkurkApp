const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Alla fält måste fyllas i');
    }
    const emailExists = await User.findOne({ email });

    if (emailExists) {
        res.status(400);
        throw new Error('Email finns redan');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });
    res.status(201).json({ message: 'Registrering lyckades', user: { id: user._id, name: user.name, email: user.email } });
});


// @desc    Login a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error('Alla fält måste fyllas i');
    }
    const user = await User.findOne({ email });

    if (!user) {
        res.status(401);
        throw new Error('Fel email eller lösenord');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        res.status(401);
        throw new Error('Fel email eller lösenord');
    }

    const token = jwt.sign(
        { id: user._id }, 
        process.env.JWT_SECRET, 
        { expiresIn: '15m' }
    );

    res.status(200).json({ 
        message: 'Inloggning lyckades', 
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        } 
    }
    );
});

// @desc    Get current user
// @route   GET /api/users/current
// @access  Private
const getCurrentUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

module.exports = {
    registerUser,
    loginUser,
    getCurrentUser
};

