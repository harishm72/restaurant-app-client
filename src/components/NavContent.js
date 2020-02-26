import React ,{Component} from 'react';
import {NavLink} from 'react-router-dom';
class NavContent extends Component{
    render(){
        return(
            <div className="nav-bar">
                <NavLink to="/" activeClassName="activeLink" exact>
                    <button onClick={this.props.home} className="nav-bar-button">
                    <i  onClick={this.props.home} className="fa fa-home"></i> Home</button>
                </NavLink>
                <NavLink to="/user" activeClassName="activeLink" exact>
                    <button className="nav-bar-button">
                    <i className="fa fa-user"></i>  Profile</button></NavLink>
                <NavLink to="/bookings" activeClassName="activeLink" exact>
                    <button className="nav-bar-button">
                    <i className="fa fa-book"></i>   My bookings</button></NavLink>
            </div>
        )
    }
}
export default NavContent;