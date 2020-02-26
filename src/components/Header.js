import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
//import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
//import MenuIcon from '@material-ui/icons/Menu';
import {NavLink} from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import { Button } from '@material-ui/core';

import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';


const styles = theme => ({
  root: {
    width: '100%',
    minHeight : "48px"
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

class Header extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            searchText : "",
            isLoggedIn : this.props.isLoggedIn
        }
      }
    
    signOutBtn = {
      backgroundColor: "white",
      margin: "12px",
      height: "36px"
    }

    handleSearch = (event) =>(this.setState({searchText : event.target.value}))

    handleSubmit = (event) =>{
        event.preventDefault();
       this.props.handleSearch(this.state.searchText);
       this.setState({searchText : ""})
    }
    componentDidMount(){
  
    }
    render(){
    const { classes } = this.props;
    return (
    <div className={classes.root}>
      <AppBar position="static" style={{backgroundColor: "#cb202d"}}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" color="inherit" noWrap>
            <NavLink to="/">{this.props.title}</NavLink>
          </Typography>
          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <form className="search" onSubmit={this.handleSubmit}>
            <InputBase
            value={this.state.searchText}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onChange={this.handleSearch}
            />
            </form>
          </div>
          <div style={{height : '32'}}>
          {this.props.isLoggedIn ? 
          <Button  style={this.signOutBtn} onClick={this.props.signOut}>Sign out</Button>
          :
          <StyledFirebaseAuth
          uiConfig={this.props.uiConfig}
          firebaseAuth={firebase.auth()}
          />
          }
          </div>    
       
        </Toolbar>
        
      </AppBar>
    </div>
  );
        }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
