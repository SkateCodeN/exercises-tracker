import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from'axios';

export default class EditExercise extends Component{
    // We create our empy state with a constructor
    constructor(props){
        super(props);
        // Binding this so we refer to the CreateExercise class
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            username:'',
            description: '',
            duration: 0,
            date: new Date(),
            users: []

        }
        
    }
    // Called before anything loads
    
    componentDidMount(){
        axios.get('http://localhost:5000/exercises/'+ this.props.match.params.id)
        .then(res => {
            this.setState({
                username: res.data.username,
                description: res.data.description,
                duration: res.data.duration,
                date: new Date(res.data.date)
            })
        })
        .catch(function (error) {
            console.log(error);
        })
        axios.get('http://localhost:5000/users/')
        .then(res => {
            if (res.data.length > 0){
                this.setState({
                    users: res.data.map( user => user.username),
                    
                })
            }
        });
        
    }
    
    //methods
        // There will be a textbox form and it will call this function
        onChangeUsername(e) {
            this.setState({
                username: e.target.value,
            });
        }
        // Ditto when the form description changes, this function gets called
        onChangeDescription(e) {
            this.setState({
                description: e.target.value
            });
        }
        //duration
        onChangeDuration(e) {
            this.setState({
                duration: e.target.value
            });
        }
        // 
        onChangeDate(date) {
            this.setState({
                date: date
            });
        }
        onSubmit(e) {
            // Dont reload
            e.preventDefault();
            const exercise ={
                username: this.state.username,
                description: this.state.description,
                duration: this.state.duration,
                date: this.state.date
            }
                axios.post('http://localhost:5000/exercises/update/'+ this.props.params.id, exercise)
                .then( res => console.log(res.data));

                console.log(exercise);
                // Go back to list of exercises
                window.location ='/';
        }
        // Now it all comes together with jsx and we create the form to show our state
    render(){
        return(
            <div>
                <h3>Edit Exercises Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                                {
                                    this.state.users.map(function(user) {
                                        return <option
                                        key={user}
                                        value={user}>
                                            {user}
                                        </option>
                                    })
                                }
                            </select>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            />

                    </div>
                    <div className="form-group">
                        <label>Duration</label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                            />
                    </div>
                    <div className="form-group">
                        <label>Date:</label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div> 
                    <div className="form-group">
                        <input type="submit" className="btn btn-primary" value="Edit Exercise Log" />
                    </div>            
                </form>
            </div>
        );
    }
}