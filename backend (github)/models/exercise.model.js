const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// The Schema is the structure of how you create data on the Mongo DB, 
// notice that it will take an object named username,

const exerciseSchema = new Schema({
    username: { type: String, required:true},
    description: {type: String, required:true},
    duration: {type: Number, required: true},
    date: {type: Date, required:true},
}, {
    timestamps: true,
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;