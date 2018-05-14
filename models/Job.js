const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
    category: String,
    title: String,
    description: String,
    minPay: Number,
    maxPay: Number,
    startDate: String,
    endDate: String,
    employer: mongoose.Schema.ObjectId
});

const Job = mongoose.model("Job", JobSchema);
module.exports = Job;
