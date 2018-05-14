const express = require("express");
const Job = require("../models/Job");
const User = require("../models/User");

const router = express.Router();

router.get("/:id", function(req, res) {
    User.find({_id: req.params.id}, function(err, user) {
        if(err) {
            res.json({error: "Student info not found"});
        }
        res.json(user);
    });
});

router.put("/:id", function(req, res){
    User.findById(req.params.id, function(err, user) {

        if(err) res.json({error: err});

        if(req.body.name){
            user.firstName = req.body.firstName;
        }  else if (req.body.gender) {
            user.gender = req.body.gender;
        } else if (req.body.about) {
            user.about = req.body.about;
        } else if(req.body.university){
            user.university = req.body.university;
        } else if(req.body.course) {
            user.course = req.body.course;
        } else if(req.body.speciality) {
            user.speciality = req.body.speciality;
        } else if(req.body.age) {
            user.age = req.body.age;
        } else if(req.body.state) {
            user.state = req.body.state;
        } else if(req.body.city) {
            user.city = req.body.city;
        } else {
            res.status = 404;
            res.json({error: "User props not found"});
        }

        user.save(function(err, updatedUser) {
            if(err) {
                res.json({error: err})
            }
            res.json(updatedUser);
        });
    });
});

router.get("/:id/jobs", function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if(err) {
            res.json({error: err});
        }
        Job.find({category: user.speciality}, function(err, job) {
            if(err){
                res.json({error: err});
            }
            res.json(job);
        });
    });
});

module.exports = router;