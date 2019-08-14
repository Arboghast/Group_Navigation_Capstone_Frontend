import React, {Component} from 'react';
import './GroupGrid.css';

let data = [
    {
        name: "Group 1",
        groupMembers: [],
        dLong: -73.942744,
        dLat: 40.790492
    },
    {
        name: "Group 2",
        groupMembers: ["Member 1", "Member 2", "Member 3"],
        dLong: -73.964716,
        dLat: 40.636434        
    }
]

class GroupGrid extends Component{
    render(){
        return (
            <ul id = "groups">
				{data.map(group => (
                	<li>{group.name}</li>
              	))}
            </ul>
        );
    }
}

export default GroupGrid;