import React from "react";
import {nanoid} from 'nanoid'
import "./App.css"
import data from "./mock-data.json"

export default class App extends React.Component{

  constructor(props){
    super(props);

    this.onChangeFirstname = this.onChangeFirstname.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeMobile = this.onChangeMobile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      users: data
    }
  }

  onChangeFirstname(e) {
    this.setState({
      firstName: e.target.value
    })
  }

  onChangeLastname(e) {
    this.setState({
      lastName: e.target.value
    })
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onChangeMobile(e) {
    this.setState({
      mobile: e.target.value
    })
  }

  handleSubmit(event){
    event.preventDefault();
    const user = {
      id: nanoid(),
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      mobile: this.state.mobile
    }

    console.log(user);

    this.setState((prev) => ({
      users: [...prev.users, user]
    }));

  }

  render(){
    return (
      <div className="app-container">
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Mobile</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.users.map((user) => (
                <tr>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>  
                </tr>
              ))
            }
          </tbody>
        </table>

        <h2>Add a new user</h2>
        <form onSubmit={this.handleSubmit}>
          <input 
            type="text" 
            name="firstName"
            required="required"
            placeholder="Enter your first name"
            onChange={this.onChangeFirstname}
          />
          <input 
            type="text" 
            name="lastName"
            required="required"
            placeholder="Enter your last name"
            onChange={this.onChangeLastname}
          />
          <input 
            type="text" 
            name="email"
            required="required"
            placeholder="Enter your email"
            onChange={this.onChangeEmail}
          />
          <input 
            type="text" 
            name="mobile"
            required="required"
            placeholder="Enter your mobile"
            onChange={this.onChangeMobile}
          />
          <button type="submit">Add</button>
        </form>


         
      </div>
    );
  }
}