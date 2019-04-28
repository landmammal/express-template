// to access variables use process.env.NAMEOFVARIABLE
import 'dotenv/config';
import cors from 'cors';
import express from 'express';

// starting application
const app = express();

// application middleware
app.use(cors());

app.get('/', (req, res) => {
    res.send('hello world');
})

module.exports = app;