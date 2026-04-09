const express = require('express');
const router = express.Router();

// Middleware chaining example
router.get('/', (req, res, next) => {
    console.log('--- Route Middleware 1 ---');
    next();
}, (req, res) => {
    console.log('--- Route Middleware 2 ---');
    res.send('User route accessed successfully');
});

module.exports = router;