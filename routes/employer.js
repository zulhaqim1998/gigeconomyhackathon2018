const express = require("express");
const Employer = require("../models/Employer");
const Job = require("../models/Job");

const router = express.Router();


router.get("/:id", function(req, res) {
    Employer.find({_id: req.params.id}, function(err, employer) {
        if(err) {
            res.json({error: "Employer info not found"});
        }
        res.json(employer);
    });
});

router.put("/:id", function(req, res){
    Employer.findById(req.params.id, function(err, employer) {

        if(err) res.json({error: err});

        if(req.body.firstName){
            employer.firstName = req.body.firstName;
        } else if (req.body.lastName) {
            employer.lastName = req.body.lastName;
        } else if (req.body.gender) {
            employer.gender = req.body.gender;
        } else if (req.body.about) {
            employer.about = req.body.about;
        }

        employer.save(function(err, updatedEmployer) {
            if(err) {
                res.json({error: err})
            }
            res.json(updatedEmployer);
        });
    });
});

router.post("/:id/postjob", function(req, res) {
    const newJob = {
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        minPay: req.body.minPay,
        maxPay: req.body.maxPay,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        employer: req.params.id
    };

    Job.create(newJob, function(err, job) {
        if(err) {
            res.json({error: err});
        }
        res.json(job);
    });
});

module.exports = router;