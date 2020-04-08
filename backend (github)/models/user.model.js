// is this the new way? --> import { Schema, Mongoose } from "mongoose";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// The Schema is the structure of how you create data on the Mongo DB, 
// notice that it will take an object named username,
// it has to be a string with a min length, it has to be unique and it will 
// contain a timestamp of when it was created, trim will trim whitespace
const userSchema = new Schema({
    username: {
        // these are called validations
        type: String,
        require: true,
        unique: true,
        trim: true,
        minlength: 3
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;