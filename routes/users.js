import express from 'express'
import User from '../models/user'

const router = express.Router();

// example secure profile route
router.get('/profile', (req, res, next) => {
    if ( !req.session.userId) {
        let err = new Error('You are not authorize to view this page.')
        err.status = 401;
        return next(err);
    }
    User.findById(req.session.userId)
        .exec(function(err, user){
            if (err) {
                return next(err);
            } else {
                return res.send('Hello ' + user.name + '.')
            }
        })
});

// GET /login
router.get('/login', (req, res, next) => {
    res.send('hello login');
});

// POST /login
router.post('/login', (req, res, next) => {
    if(req.body.email && req.body.password){
        User.authenticate(req.body.email, req.body.password, function(err, user){
            if (err || !user) {
                let err = new Error('Wrong email or password');
                err.status = 401;
                return next(err);
            } else {
                req.session.userId = user._id;
                return res.redirect('./profile');
            }
        });
    } else {
        let err = new Error('Email and Password are required');
        err.status = 401;
        return next(err);
    }
});

// GET /register
router.get('/register', (req, res, next) => {
    res.send('hello register');
});

// POST /register
router.post('/register', (req, res, next) => {
    if(req.body.email &&
       req.body.name &&
       req.body.password && 
       req.body.confirmPassword){

        // confirm passwords match 
        if(req.body.password !== req.body.confirmPassword){
            let err = new Error("Passwords dont match.");
            err.status = 400;
            return next(err);
        }

        // create object with form input
        let userDetails = {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password
        }

        // insert new user into mongo db
        User.create(userDetails, (err, user) => {
            if (err){
                return next(err);
            } else{
                req.session.userId = user._id;
                return res.redirect('/');
            }
        });
       } else{
           let err = new Error("All fields required.");
           err.status = 400;
           return next(err);
       }
})


module.exports = router;