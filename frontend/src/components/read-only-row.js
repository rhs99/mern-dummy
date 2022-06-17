import React from "react";

export default class ReadOnlyRow extends React.Component{
    render(){
        return (
            <tr>
                <td>{this.props.user.firstName}</td>
                <td>{this.props.user.lastName}</td>
                <td>{this.props.user.email}</td>
                <td>{this.props.user.mobile}</td>  
                <td>
                    <button type="button" onClick={(event) => this.props.handleUpdateClick(event, this.props.user)}>
                        Update
                    </button>
                    <button type="button" onClick={(event) => this.props.handleDeleteClick(this.props.user._id)}>
                        Delete
                    </button>
                </td>
            </tr>
        );
    }
}