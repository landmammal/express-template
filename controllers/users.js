import User from '../models/user';

// compares user input to db input and creates a session for them.
exports.loginUser = (req, res, next) => {
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
}

// adds users to db, validates inputs and creates sessions
exports.registerUser = (req, res, next) => {
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
}

// looks for user in the db and returns him
exports.userProfile = (req, res, next) => {
    User.findById(req.session.userId)
        .exec(function(err, user){
            if (err) {
                return next(err);
            } else {
                return res.send('Hello ' + user.name + '.')
            }
        })
}

// deletes a users session
exports.userLogout = (req, res, next) => {
    if (req.session) {
        // delete session
        req.session.destroy( (err) => {
            if (err){
                return next(err)
            } else {
                res.redirect('/')
            }
        })
    }
}