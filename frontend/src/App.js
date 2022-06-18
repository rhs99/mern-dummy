import React from "react";
import "./App.css";
import CreateUser from "./components/create-user";
import ShowUserList from "./components/show-user-list";

export default class App extends React.Component{
  render(){
    return (
      <div className="app-container">
        <h2>Add a new user</h2>
        <CreateUser />
        <h2>All users informations</h2>
        <ShowUserList />
      </div>
    );
  }
}