import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true // removes white spaces before or after the text
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
        // min: 18
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

// authenticate input against whats in the db
userSchema.statics.authenticate = function(email, password, callback){
  User.findOne({ email: email })
        .exec(function(err, user){
            if(err){
                return callback(err);
            }else if ( !user ) {
                let err = new Error('No user Associated with this email.')
                err.status = 401;
                return callback(err);
            }
            // compare password
            bcrypt.compare(password, user.password, function(err, result){
                if (result === true){
                    return callback(null, user)
                }else {
                    return callback();
                }
            });
        }); // execute the query on the db
};
// hash password before storing to db
userSchema.pre('save', function(next) {
    let user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
        if(err){
            return next(err);
        }
        user.password = hash;
        next();
    });
});

// creates a table name with a define schema
const User = mongoose.model('User', userSchema); 
module.exports = User;