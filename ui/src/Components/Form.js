import React, {Component} from 'react';
import UserCard from './UserCard';
import './Form.css';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import axios from 'axios';

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

    handleSubmit(e){
        e.preventDefault();
        let newGroup = {
            name: this.state.name,
            users: this.state.selectedUsers,
            latitude: this.state.lat,
            longitude: this.state.lon
        };
        this.props.socket.emit('create', newGroup);
        //console.log('emitted create')
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
        else{
            return (
                <form className = "form" onSubmit = {this.handleSubmit}>
                    <div className = "groupName">
                        Name of the Group:
                        <input name="name" type="text" onChange={this.handleChange} />
                    </div>
                    <div className = "userList">
                        {this.props.users.map(user => (
                            <UserCard key = {user.id} user = {user} selected = {false} addUserFunction = {this.addUserToGroup} removeUserFunction = {this.removeUserFromGroup}/>
                        ))}
                    </div>
                    <div>
                        Latitude:
                        <input name="lat" type="text" className ="location" onChange={this.handleChange}/>
                        Longitude:
                        <input name="lon" type="text" className = "location" onChange={this.handleChange}/>
                    </div>
                    <input type="submit" />
                </form>
                )
        }
    }

}

const mapStateToProps = state => {
    return {
      users: state.users,
      groups: state.groups
    };
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
}
  
export default connect(mapStateToProps,mapDispatchToProps)(Form)
