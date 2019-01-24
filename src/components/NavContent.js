import React ,{Component} from 'react';
import {NavLink} from 'react-router-dom';
class NavContent extends Component{
    render(){
        return(
            <div className="nav-bar">
                <NavLink to="/"><button onClick={this.props.home} className="nav-bar-button">Home</button></NavLink>
                <NavLink to="/user"><button className="nav-bar-button">Profile</button></NavLink>
                <NavLink to="/bookings"><button className="nav-bar-button">My bookings</button></NavLink>
            </div>
        )
    }
}
export default NavContent;