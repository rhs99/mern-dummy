import React from "react";
import axios from 'axios'

export default class CreateUser extends React.Component{
    constructor(props){
        super(props);
    
        this.onChangeFirstname = this.onChangeFirstname.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeMobile = this.onChangeMobile.bind(this);
    
        this.handleCreateSubmit = this.handleCreateSubmit.bind(this);      
    
        this.state = {
          firstName: '',
          lastName: '',
          email: '',
          mobile: ''
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
    
    handleCreateSubmit(event){
        event.preventDefault();
    
        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            mobile: this.state.mobile
        }
    
        axios.post('http://localhost:3050/user/create', user)
        .then(res => this.props.updateUserList())
        .catch(error => console.log(error));  

    }

    render(){
        return (
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
        );
    }
}