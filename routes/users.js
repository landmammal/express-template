import express from 'express'
import User from '../models/user'

const router = express.Router();

// GET /register
router.get('/register', (req, res, next) => {
    res.send('hello world');
})

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