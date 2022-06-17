import React, {Fragment} from "react";
import {nanoid} from 'nanoid';
import "./App.css";
import data from "./mock-data.json";
import ReadOnlyRow from "./components/read-only-row";
import UpdatableRow from "./components/updatable-row";

export default class App extends React.Component{

  constructor(props){
    super(props);

    this.onChangeFirstname = this.onChangeFirstname.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeMobile = this.onChangeMobile.bind(this);
    this.handleUpdateClick = this.handleUpdateClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleCreateSubmit = this.handleCreateSubmit.bind(this);
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
   

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      updateID: null,
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

  handleUpdateClick(event, user){
    event.preventDefault();

    const formValue = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile
    }

    this.setState({
      ...formValue,
      updateID: user.id
    })
  }
  
  handleCancelClick(){
    this.setState({
      updateID: null
    })
  }


  handleDeleteClick(id){
    const newUsers = [...this.state.users];
    const index = newUsers.findIndex((user) => user.id === id);
    newUsers.splice(index, 1);
    this.setState({
      users: newUsers
    })
  }

  handleCreateSubmit(event){
    event.preventDefault();
    const user = {
      id: nanoid(),
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      mobile: this.state.mobile
    }

    this.setState((prev) => ({
      users: [...prev.users, user]
    }));
  }

  handleUpdateSubmit(event){
    event.preventDefault();
    const user = {
      id: this.state.updateID,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      mobile: this.state.mobile
    } 
    const newUsers = [...this.state.users];
    const index = newUsers.findIndex((user) => user.id === this.state.updateID);
    newUsers[index] = user;

    this.setState({
      updateID: null,
      users: newUsers
    })
  }


 
  render(){
    return (
      <div className="app-container">
        <form onSubmit={this.handleUpdateSubmit}>
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.users.map((user) => (
                  <Fragment>
                    {this.state.updateID === user.id ? (
                      <UpdatableRow prevData={this.state} 
                        onChangeFirstname={this.onChangeFirstname}
                        onChangeLastname={this.onChangeLastname}
                        onChangeEmail={this.onChangeEmail}
                        onChangeMobile={this.onChangeMobile}
                        handleCancelClick={this.handleCancelClick}
                        key={user.id}/>
                    ) : (
                      <ReadOnlyRow user={user} handleUpdateClick={this.handleUpdateClick} handleDeleteClick={this.handleDeleteClick} key={user.id} />
                    )}
                  </Fragment>
                ))
              }
            </tbody>
          </table>
        </form>
       
        <h2>Add a new user</h2>
        <form onSubmit={this.handleCreateSubmit}>
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
            type="email" 
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