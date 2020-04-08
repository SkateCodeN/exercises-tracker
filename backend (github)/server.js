//Lets import the packages we need
//express
const express = require('express');
//cors -> Cross Origin Resource Sharing
const cors = require('cors');
// mongoose to connect db
const mongoose = require('mongoose');

//Load dotenv 
// Loads environment variables to our local dotenv file
require('dotenv').config();

// var app is now an istance of express which references 
// the express library
// with process.env.port we create a port 5000 and assing it to var 
// port
const app = express();
const port = process.env.port || 5000;
// Our app instance uses cors here
// we will also parse objects through json for easier reading
app.use(cors());
app.use(express.json());

// If the port is active, the message will display
// means its active because active ports listen to requests.
app.listen(port, () => {
    console.log(`Server is up, running on port ${port}`);
});

// Lets talk to our MongoDB
// uri is our connection string provided earlier
const uri = process.env.ATLAS_URI;
// To deal with updates from MongoDB and not fuck up anything pass those 2 
//object params
mongoose.connect(uri, {useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology: true});
// Create connection with mongoose and once that is true, log that string
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection was successful");
}) // do we not need a closing ; here??

// Lets require our router routes here to handle CRUF HTTP Reuests
const exerciseRouter = require('./routes/exercises');
const userRouter = require('./routes/users');

app.use('/exercises', exerciseRouter);
app.use('/users', userRouter);