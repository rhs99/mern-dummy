import React, {Fragment} from "react";
import axios from 'axios'
import UpdatableRow from "./updatable-row";
import ReadOnlyRow from "./read-only-row";

export default class ShowUserList extends React.Component{

    constructor(props){
        super(props);

        this.onChangeFirstname = this.onChangeFirstname.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeMobile = this.onChangeMobile.bind(this);

        this.handleUpdateClick = this.handleUpdateClick.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
       
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            mobile: '',
            updateID: null,
            users: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:3050/user/list')
        .then(response => this.setState({users: response.data}))
        .catch(error=>{
          console.log(error)
        })
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
          updateID: user._id
        })
    }
      
    handleCancelClick(){
        this.setState({
            updateID: null
        })
    }
    
    
    handleDeleteClick(id){
        axios.patch('http://localhost:3050/user/delete/' + id)
        .then(res => {
        axios.get('http://localhost:3050/user/list')
        .then(response => this.setState({
            users: response.data
        }))
        .catch(error=>{
            console.log(error)
        })
        });
    }

    handleUpdateSubmit(event){
        event.preventDefault();
        const user = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          mobile: this.state.mobile
        } 
    
        axios.patch('http://localhost:3050/user/update/' + this.state.updateID, user)
        .then(res => {
          axios.get('http://localhost:3050/user/list')
          .then(response => this.setState({
            users: response.data,
            updateID: null
    
          }))
          .catch(error=>{
            console.log(error)
          })
        });
    }

    render(){
        return (
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
                            {this.state.updateID === user._id ? (
                            <UpdatableRow
                                curVal={this.state} 
                                onChangeFirstname={this.onChangeFirstname}
                                onChangeLastname={this.onChangeLastname}
                                onChangeEmail={this.onChangeEmail}
                                onChangeMobile={this.onChangeMobile}
                                handleCancelClick={this.handleCancelClick}
                                key={user._id}/>
                            ) : (
                            <ReadOnlyRow user={user} handleUpdateClick={this.handleUpdateClick} handleDeleteClick={this.handleDeleteClick} key={user._id} />
                            )}
                        </Fragment>
                        ))
                    }
                    </tbody>
                </table>
            </form>
        );
    }
}