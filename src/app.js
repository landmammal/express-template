// to access variables use process.env.NAMEOFVARIABLE
import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import routes from '../routes';

// mongod connection
mongoose.connect('mongodb://localhost:27017/my_database', { useNewUrlParser: true, useCreateIndex: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

// starting application
const app = express();

// parse incoming request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// application middleware
app.use(cors()); // handles crossorigin request defaul is *
app.use(express.static('../public')); // where to look for static files 
app.use(routes); // our routing manager for all requests

module.exports = app;