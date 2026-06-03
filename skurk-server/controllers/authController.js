
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, name, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Användarnamn, email och lösenord krävs");
  }

  const usernameExists = await User.findOne({ username });

  if (usernameExists) {
    res.status(400);
    throw new Error("Användarnamnet finns redan");
  }

  const emailExists = await User.findOne({ email });

  if (emailExists) {
    res.status(400);
    throw new Error("Email finns redan");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    name: name || "",
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    message: "Registrering lyckades",
    user: {
      id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
    },
  });
});

// @desc    Login a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    throw new Error("Användarnamn och lösenord krävs");
  }

  const user = await User.findOne({ username });

  if (!user) {
    res.status(401);
    throw new Error("Fel användarnamn eller lösenord");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    res.status(401);
    throw new Error("Fel användarnamn eller lösenord");
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(200).json({
    message: "Inloggning lyckades",
    token,
    user: {
      id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
    },
  });
});

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getCurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    id: req.user._id,
    username: req.user.username,
    name: req.user.name,
    email: req.user.email,
  });
});

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
};
