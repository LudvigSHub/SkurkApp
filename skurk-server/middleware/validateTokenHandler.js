const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


// HÄMTA token från AUTH: BEARER (token) HEADER
const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];
      
    } if (!token) {
        res.status(401);
        throw new Error('Ingen token tillgänglig');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
        res.status(401);
        throw new Error('Ogiltig token');
    }
    req.user = user;
    next();
});

// VERIFIERA token med JWT_SECRET från .env

// OM GILTLIGT: sätter req.user och kör next()

// OM OGILTIGT: kasta error 401 Unauthorized

module.exports = validateToken;