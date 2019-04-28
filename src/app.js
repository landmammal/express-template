// to access variables use process.env.NAMEOFVARIABLE
import 'dotenv/config'
import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('hello world');
})

module.exports = app;