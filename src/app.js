// to access variables use process.env.NAMEOFVARIABLE
import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import models, { connectDb } from '../models';
const MongoStore = require('connect-mongo')(session);
import routes from '../routes';

// starting application
const app = express();

// mongodb connection
connectDb();
const db = mongoose.connection;
// mongo error handler
db.on('error', console.error.bind(console, 'connection error:'));

// use session for tracking logins
app.use(session({
    secret: process.env.SECRETSESSION,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

// make users with sessions available in views
app.use( (req, res, next) => {
    res.locals.currentUser = req.session.userId;
    next();
});

// parse incoming request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// application middleware
app.use(cors()); // handles crossorigin request defaul is *
app.use(express.static('../public')); // where to look for static files 
app.use(routes); // our routing manager for all requests

// custom error 
app.use( (req, res, next) => {
    let err = new Error('Not found');
    err.status = 404;
    next(err);
})
app.use( (err, req, res, next) => {
    res.locals.error = err;
    res.status = (err.status);
    res.send('custom ' + err);
})

module.exports = app;