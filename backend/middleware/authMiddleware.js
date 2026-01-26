// External Module
import jwt from 'jsonwebtoken';
// Local Modules
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

// we have two functions in this file, we're gonna have `protect` which will allow us to protect routes for users that are registered, and then we'll also have an admin middleware function for users that are Admin, for instance, to get all the order we have to be a admin for that.

// Protect middleware (this will protect routes)
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Read the JWT from the cookie 
    token = req.cookies.jwt;
    // (make sure to install `cookie-parser` package and add a cookie parser middleware in your server.js in order to access `res.cookies`)

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);      // this will return us the payload object
            req.user = await User.findById(decoded.userId).select('-password'); // this will return the document with matching userId without password field because we don't want password
            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not authorized, token failed');    // if this fires it mean we have the token but it's not the right token, it's not authorized            
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
})


// Admin middleware
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as admin');
    }
};

export { protect, admin };





