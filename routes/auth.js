const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Employer = require("../models/Employer");


//signup route
router.post('/signup/student', function(req, res, next){

    if (req.body.password !== req.body.passwordConf) {
        const err = new Error('Passwords do not match.');
        err.status = 400;
        res.json({err: "passwords dont match"});
        return next(err);
    }

    if(req.body.email && req.body.username && req.body.password && req.body.passwordConf){
        const userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        };
        User.create(userData, function(err, user){
            if(err){
                return next(err);
            }
            console.log('new user created');
            req.session.userId = user._id;
            res.json(user);
        });
    }
});

router.post('/signup/employer', function(req, res, next){

    if (req.body.password !== req.body.passwordConf) {
        const err = new Error('Passwords do not match.');
        err.status = 400;
        res.json({err: "passwords dont match"});
        return next(err);
    }

    if(req.body.email && req.body.username && req.body.password && req.body.passwordConf && req.body.type){
        const employerData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            type: req.body.type
        };
        Employer.create(employerData, function(err, newEmployer){
            if(err){
                return next(err);
            }
            console.log('new employer created');
            req.session.userId = newEmployer._id;
            return res.json(newEmployer);
        });
    }
});

User.authenticate = function(email, password, callback){
    User.findOne({ email: email })
        .exec(function(err, user){
            if(err){
                return callback(err);
            } else if(!user){
                const err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, user.password, function(err, result){
                if(result === true){
                    return callback(null, user);
                }
                return callback();
            });
        });
};

Employer.authenticate = function(email, password, callback){
    Employer.findOne({ email: email })
        .exec(function(err, employer){
            if(err){
                return callback(err);
            } else if(!employer){
                const err = new Error('Employer not found.');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, employer.password, function(err, result){
                if(result === true){
                    return callback(null, employer);
                }
                return callback();
            });
        });
};

//login route
router.post('/login', function(req, res, next){

    if(req.body.logemail && req.body.logpassword){
        User.authenticate(req.body.logemail, req.body.logpassword, function(error, user){
            if(error || !user){
                const err = new Error('Wrong email or password');
                err.status = 401;
                return next(err);
            }
            req.session.userId = user._id;
            return res.json(user);
        });
    }
});

router.get('/profile', function(req, res, next){
    User.findById(req.session.userId)
        .exec(function(error, user){
            if(error){
                return next(err);
            } else {
                if(user === null) {
                    const err = new Error('Not authorized!');
                    err.status = 400;
                    return next(err);
                } else {
                    return res.send(user);
                }
            }
        });
});

router.get('/logout', function(req, res, next){
    if(req.session){
        //delete session
        req.session.destroy(function(err){
            if(err){
                return next(err);
            }
            return res.redirect('/');
        });
    }
});

module.exports = router;