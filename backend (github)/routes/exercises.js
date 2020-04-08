const router = require('express').Router();
let Exercise = require('../models/Exercise.model');

// When the HTTP request is / we get a list of Exercises, ie we query the DB 
//with a get command, otherwise we get an error
// READ ALL 
router.route('/').get((req, res) => {
    Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});
// Ditto with the route '/add' 
// we set our Exercise name and then save it, 
// we post it to the DB and get a success msg or error
// CREATE
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    
    });

    newExercise.save()
    .then(() => res.json(`Exercise for ${username} was added, summary: ${description}`))
    .catch( err => res.status(400).json('Error: ' + err));
});

// UPDATE
// How can we refactor to only update the item you want to update 
// without the need of having to pass all the params again
// my gut says function?
router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
    .then( exercise => {
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);

        exercise.save()
        .then(() => res.json(`Exercise for ${exercise.username} was updated, summary: ${exercise.description}`))
        .catch( err => res.status(400).json('Error: ' + err));
        
    })
});
//DELETE
router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json("Exercise deleted"))
        .catch( err => res.status(400).json('Error: ' + err));
});
//READ Single by ID
router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch( err => res.status(400).json('Error: ' + err));
});
module.exports = router;