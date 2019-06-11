const express = require('express');
const router = express.Router();

// @route  GET api/users
// @desc   Test Route
// @access Public
router.get('/', (reg, res) => res.send('post Route'));

module.exports = router;