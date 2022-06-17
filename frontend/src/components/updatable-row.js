import React from "react";

export default class UpdatableRow extends React.Component{
    render(){
        return (
            <tr>
                <td>
                    <input
                        type="text"
                        required="required"
                        placeholder="Enter your first name"
                        name="firstName"
                        value={this.props.prevData.firstName}
                        onChange={this.props.onChangeFirstname}
                    ></input>
                </td>

                <td>
                    <input
                        type="text"
                        required="required"
                        placeholder="Enter your last name"
                        name="lastName"
                        value={this.props.prevData.lastName}
                        onChange={this.props.onChangeLastname}
                    ></input>
                </td>

                <td>
                    <input
                        type="email"
                        required="required"
                        placeholder="Enter your email"
                        name="email"
                        value={this.props.prevData.email}
                        onChange={this.props.onChangeEmail}
                    ></input>
                </td>

                <td>
                    <input
                        type="text"
                        required="required"
                        placeholder="Enter your mobile"
                        name="mobile"
                        value={this.props.prevData.mobile}
                        onChange={this.props.onChangeMobile}
                    ></input>
                </td>
                <td>
                    <button type="submit">Save</button>
                    <button type="button" onClick={this.props.handleCancelClick}>Cancel</button>
                </td>
                
            </tr>
        );
    }
}