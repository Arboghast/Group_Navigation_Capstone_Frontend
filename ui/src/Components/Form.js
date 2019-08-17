import React, {Component} from 'react';
import UserCard from './UserCard';
import './Form.css';
import {connect} from 'react-redux';
import {addGroups} from '../Actions';
import {Redirect} from 'react-router';

class Form extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "New Group",
            selectedUsers: [],
            lat: 0,
            lon: 0,
            redirect: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addUserToGroup = this.addUserToGroup.bind(this);
        this.removeUserFromGroup = this.removeUserFromGroup.bind(this);
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    addUserToGroup(user){
        let newSelectedUsers = [...this.state.selectedUsers, user]
        this.setState({
            selectedUsers: newSelectedUsers
        })
    }

    removeUserFromGroup(user){
        let newSelectedUsers = this.state.selectedUsers;
        for (let i = 0; i < newSelectedUsers.length; i++){
            if (newSelectedUsers[i].id === user.id){
                newSelectedUsers.splice(i, 1);
                break;
            }
        }
        this.setState({
            selectedUsers: newSelectedUsers
        })
    }

    handleSubmit(){
        let newGroup = {
            name: this.state.name,
            users: this.state.selectedUsers,
            latitude: this.state.lat,
            longitude: this.state.lon
        };
        this.props.addGroups(newGroup);
        this.setState({
            redirect: true
        })
    }

    render() {
        if (this.state.redirect){
            return (
                <Redirect to='/dashboard' />
            )
        }
        return (
        <form className = "searchForm" onSubmit = {this.handleSubmit}>
            <div className = "formHeader">
                Create a New Group
            </div>
            <div className = "subheader">
                Name of the Group:
                <input className = "nameInputField" name="name" type="text" onChange={this.handleChange} />
            </div>
            <div className = "subheader">
                Select Users:
            </div>
            <div className = "userList">
				{this.props.users.map(user => (
                	<UserCard key = {user.id} user = {user} selected = {false} addUserFunction = {this.addUserToGroup} removeUserFunction = {this.removeUserFromGroup}/>
                ))}
            </div>
            <div className = "subheader">
                Enter Meetup Location:
            </div>
            <div className = "latLonInput">
                <div className = "subheader">
                    Latitude:
                </div>
                <div>
                   <input className = "latInputField" name="lat" type="text" onChange={this.handleChange}/>
                </div>
                <div className = "subheader">
                    Longitude:
                </div>
                <div>
                    <input className = "lonInputField" name="lon" type="text" onChange={this.handleChange}/>
                </div>
            </div>
            <div className = "createGroupButton">
                <input className = "submitButton" type="submit" value = "Create Group!"/>
            </div>
        </form>
        )
    }

}

const mapStateToProps = state => {
    return {
      users: state.users,
      groups: state.groups
    };
}
  
export default connect(mapStateToProps,{
    addGroups
})(Form)