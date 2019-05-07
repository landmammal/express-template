import { Router } from 'express';
import usersController from '../controllers/users';
import mid from '../middleware/index';

const router = Router();

// Get /profile with authorization 
router.get('/profile', mid.requiredLogin, usersController.userProfile);

// GET /login render view
router.get('/login', mid.loggedOut, (req, res, next) => {
    res.send('hello login');
});

// POST /login handles users log in
router.post('/login', usersController.loginUser);

// GET /logout 
router.get('/logout', usersController.userLogout);

// GET /register
router.get('/register', mid.loggedOut, (req, res, next) => {
    res.send('hello register');
});

// POST /register registers users to app
router.post('/register', usersController.registerUser)

module.exports = router;