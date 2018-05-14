const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const EmployerSchema = new Schema({
    username: String,
    email: String,
    password: String,
    type: String,
});

EmployerSchema.pre('save', function(next){
    const user = this;
    bcrypt.hash(user.password, 10, function(err, hash){
        if(err){
            return next(err);
        }
        user.password = hash;
        next();
    });
});

const Employer = mongoose.model('Employer', EmployerSchema);
module.exports = Employer;