import express from 'express'

const router = express.Router();

// GET /register
router.get('/register', (req, res, next) => {
    res.send('hello world');
})

// POST /register
router.get('/register', (req, res, next) => {
    res.send('hello world');
})


module.exports = router;