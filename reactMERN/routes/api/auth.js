const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const {
    check,
    validationResult
} = require('express-validator/check');

// @route  GET api/users
// @desc   Test Route
// @access Public
router.get('/', auth, async (reg, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route POST api/auth
// @desc test route
//
router.post('/', [

        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password is required').exists()
    ],
    async (req, res) => {
        //console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            email,
            password
        } = req.body;

        try {

            let user = await User.findOne({
                email
            });

            if (!user) {
                return res.status(400).json({
                    errors: [{
                        msg: 'Invalid credentials'
                    }]
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({
                    errors: [{
                        msg: 'Invalid credentials'
                    }]
                });
            }

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload, config.get('jwtSecret'), {
                expiresIn: 3600000
            }, (err, token) => {
                if (err) throw err;
                res.json({
                    token
                });
            }); // change back to 3600 at prod.

            // return
            //res.send('User route');
            //res.send('User registered');

        } catch (err) {
            console.error(err.message);
            res.status(500).send('server error');
        }

    });

module.exports = router;