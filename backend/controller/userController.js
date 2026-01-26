// Local Modules
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        // we created a custom method(matchPassword) to the User model that checks whether a given password matches the hashed password stored in the database.

        generateToken(res, user._id);
        
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(401);    // 401 represent unauthorized access
        throw new Error('Invalid email or password');
    }
})
// here when a request is made out to auth route, we first validate the email and password and if the validation gets successful we go ahead and create a json webtoken and then we set it as a Http only cookie and then that can get sent with every request after that




// @desc    Register user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);    // 400 means client error
        throw new Error('User already exists');
    }
    
    // we could hash the password here but we like to keep the controller methods/functions as slim as possible, so we're gonna do the hashing in the User model using `pre`
    const user = await User.create({name, email, password});

    if (user) {
        generateToken(res, user._id);
        res.status(201).json({      // 201 means everything is good and something is created
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(400);    // 400 means client error
        throw new Error('Invaid user data');
    }
});


// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
    // clear the cookie
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: 'Logged out successfully'});
})
// We're gonna be storing JSON webtoken in an HTTP only cookie on the server, so we need to destroy that(It's not just the matter of clearing localStorage in the frontend)


// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404);
        throw new Error('User not found');
    }
})


// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        // we only wanna update the field we send it in the body, so I wanna be able to send just the name and have just the name update, I don't have to send every field
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }
        // reason we are dealing with password like this is because the password that are in the database is hashed so we only want to mess with it if it's being updated

        // pre('save') hook executes before save operation
        const updatedUser = await user.save();  // `user.save` will return the updated user data

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })

    } else {
        res.status(404);
        throw new Error('User not found');
    }

})
// here we're not passing the id in the route(/api/users/:id) because we're gonna use the token, this is for the user to update their own profile so they only have access to their own user data and that's gonna be encoded in the JSON webtoken, so no need to pass an id in here



// @desc    Get users
// @route   GET /api/users 
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    res.send('get users');
})
// this is actually gonna be an admin route because we don't want regular users to be able to get other users information, so that would be an admin action



// @desc    Get user by ID
// @route   GET /api/users/:id 
// @access  Private/Admin
const getUserByID = asyncHandler(async (req, res) => {
    res.send('get users by id');
})



// @desc    Delete users
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    res.send('delete user');
})



// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    res.send('update user');
})
// this is where the admin update any user


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserByID,
    deleteUser,
    updateUser
}






