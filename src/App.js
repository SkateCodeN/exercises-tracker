import React from 'react';
//import the React-router
import {BrowserRouter as Router, Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import ExercisesList from "./components/exercise-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";
import './App.css';

function App() {
  return (
    // We wrap our app in a router tag
    <Router>
      <div className="container"> 
      <Navbar />
      <Route path ="/" exact component={ExercisesList} />
      <Route path ="/edit/:id" exact component={EditExercise} />
      <Route path ="/create" exact component={CreateExercise} />
      <Route path ="/user" exact component={CreateUser} /> 
      </div>
      
    </Router>
  );
}

export default App;
