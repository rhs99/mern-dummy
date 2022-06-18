import React from "react";
import axios from "axios";
import "./App.css";
import CreateUser from "./components/create-user";
import ShowUserList from "./components/show-user-list";

export default class App extends React.Component{

  constructor(props){
    super(props);

    this.updateUserList = this.updateUserList.bind(this);

    this.state = {
      users: []
    }
  }

  componentDidMount(){
    this.updateUserList();
  }

  updateUserList(){
    axios.get('http://localhost:3050/user/list')
    .then(response => this.setState({users: response.data}))
    .catch(error=>{
      console.log(error)
    })
  }

  render(){
    return (
      <div className="app-container">
        <h2>Add a new user</h2>
        <CreateUser updateUserList={this.updateUserList}/>
        <h2>All users informations</h2>
        <ShowUserList updateUserList={this.updateUserList} users={this.state.users}/>
      </div>
    );
  }
}