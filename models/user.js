import mongoose from 'mongoose';

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

// creates a table name with a define schema
const User = mongoose.model('User', userSchema); 
module.exports = User;