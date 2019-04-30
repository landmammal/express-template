
import 'dotenv/config';
import http from 'http'; // http  module to set up server accepting https requests

// importing express app setup
const app = require('./src/app')

const port = process.env.PORT || 3000;

// passing express app to handle all request
const server = http.createServer(app);

server.listen(port);
console.log('server is live on port: ' + port)
