const express = require('express');
const router = express.Router();
const {
    check,
    validationResult
} = require('express-validator/check');
const gravatar = require('gravatar');

const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
// @route  GET api/users
// @desc   Test Route
// @access Public
//router.get('/', (reg, res) => res.send('User Route'));

router.post('/', [
        check(
            'name',
            'Name is required'
        ).not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({
            min: 6
        })
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
            name,
            email,
            password
        } = req.body;

        try {

            let user = await User.findOne({
                email
            });

            if (user) {
                return res.status(400).json({
                    errors: [{
                        msg: 'USER ALREADY EXISTS'
                    }]
                });
            }
            // see if user exists

            // get users gravatar
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mn'
            })

            user = new User({
                name,
                email,
                avatar,
                password
            });

            // encrypt password w/ bcrypt
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            //anything that returns a promise you want to put an await in front of
            await user.save();

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