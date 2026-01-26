// External Module
import express from 'express';
// Local Module
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserByID,
    deleteUser,
    updateUser
} from '../controller/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js';


const router = express.Router();

// router.get('/', getUsers)
router.route('/').post(registerUser).get(protect, admin, getUsers);

router.post('/auth', authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.post('/logout', logoutUser);

router.route('/:id').get(protect, admin, getUserByID).put(protect, admin, updateUser).delete(protect, admin, deleteUser);


export default router;


/*  --Express.js routing shortcut--
    router.route('/').post(registerUser).get(getUsers);
    // This is an Express.js routing shortcut. It defines multiple actions for the same URL.
        // .post(registerUser): Runs registerUser when a POST request hits this route
        // .get(getUsers): Runs getUsers when a GET request hits the same route
    // Chaining .post(registerUser) and .get(getUsers) assigns different controller functions based on the request method

    // `getUsers` ultimately gonna be an admin function and admin route, so we're gonna have to add a middleware so to make it to only admin can get users 
*/