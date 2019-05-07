// checked if user is logged ut if he is then continues else it redirects to profile
function loggedOut (req, res, next) {
    if (req.session && req.session.userId){
        return res.redirect('./profile');
    }
    return next();
};

function requiredLogin (req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    } else {
        let err = new Error("You must be looged in to view this page.")
        err.status = 401;
        return next(err);
    }
}

module.exports.loggedOut = loggedOut;
module.exports.requiredLogin = requiredLogin;