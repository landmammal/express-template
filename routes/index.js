import express from 'express';

// initializing router middleware
const router = express.Router();

router.get('/', (req, res) => {
    res.send('hello world');
})

module.exports = router;