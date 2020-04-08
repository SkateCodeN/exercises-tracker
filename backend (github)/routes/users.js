const router = require('express').Router();
let User = require('../models/user.model');

// When the HTTP request is / we get a list of users, ie we query the DB 
//with a get command, otherwise we get an erro
router.route('/').get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});
// Ditto with the route '/add' 
// we set our username and then save it, 
// we post it to the DB and get a success msg or error
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const newUser = new User({username});
    
    newUser.save()
    .then(() => res.json(`User ${username} was added`))
    .catch( err => res.status(400).json('Error: ' + err));
});

module.exports = router;

// will add this later ... a few hour later I added
// Based on understanding of context and structure
//Update 
//Delete
// UPDATE
router.route('/update/:id').post((req, res) => {
    
    User.findById(req.params.id)
    .then( user => {
        let oldName = user.username;
        user.username = req.body.username;
        
        user.save()
        .then(() => res.json(`Username ${oldName} was changed to  ${user.username}`))
        .catch( err => res.status(400).json('Error: ' + err));
        
    })
});
//DELETE
router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json("User deleted"))
        .catch( err => res.status(400).json('Error: ' + err));
});
//READ Single by ID
router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch( err => res.status(400).json('Error: ' + err));
});