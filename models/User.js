const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({

    name :{
        type: String,
        // required: true
    },
    gender: {
        type: String,
        // required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    about: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    speciality: String,
    university: String,
    course: String,
    age: Number,
    state: String,
    city: String,
    postcode: Number,
    country: String,
    experience: String,
    about: String,
    phone: String,
    facebook: String,
    twitter: String

});

UserSchema.pre('save', function(next){
    const user = this;
    bcrypt.hash(user.password, 10, function(err, hash){
        if(err){
            return next(err);
        }
        user.password = hash;
        next();
    });
});

// UserSchema.statics.authenticate = function(email, password, callback){
//     UserSchema.findOne({ email: email })
//         .exec(function(err, user){
//             if(err){
//                 return callback(err);
//             } else if(!user){
//                 const err = new Error('User not found.');
//                 err.status = 401;
//                 return callback(err);
//             }
//             bcrypt.compare(password, user.password, function(err, result){
//                 if(result === true){
//                     return callback(null, user);
//                 }
//                 return callback();
//             });
//         });
// };

const User = mongoose.model('User', UserSchema);
module.exports = User;