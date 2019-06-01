const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
    //user has already had their email and pw authed
    //we just need to give them a token
    res.send({ token: tokenForUser(req.user)});
}
exports.signup = function(req, res, next) {
   // res.send({ success: 'true'});
    //req.body -> anything contained in this post request
   //see if a user with a given email exists
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(422).send({error:'You must provide email and password'});
    }

    User.findOne({email: email}, function(err, existingUser) {
        if (err){ return next(err)};
        //if a user with email does exist, return error
        if (existingUser) {
            return res.status(422).send({error: 'email is in use'});//422 -> bad info
        }
        //if a user with email does not exist, create and save user record
        const user = new User({
            email: email,
            password: password
        });

        user.save(function(err){
            if (err){return next(err)};

            //respond to request indicating the user was created
            res.json({token: tokenForUser(user)});
        }); //save record to db
        
    });
   

   
}