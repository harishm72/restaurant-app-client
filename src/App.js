import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './styles/App.css';
import Header from './components/Header';
import NavContent from './components/NavContent';
import Home from './components/Home';
import Profile from './components/Profile';
import Booking from './components/Booking';
import BookTable from './components/BookTable';
import Footer from './components/Footer';
import firebase from 'firebase';

import { connect } from 'react-redux'
import { fetchTrending, fetchSearchResults, getUserInfo, signOut} from './store/actions';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      title: "Zomato",
      email: "",
      user: "",
      booked: ''
    }
  }
  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  }
  componentDidMount = () => {
    this.props.fetchTrending()
    
    firebase.auth().onAuthStateChanged(currentUser => {
      this.setState({
        isLoggedIn: !!currentUser,
        email: currentUser.email
      })
      this.props.getUserInfo(currentUser)
    })
  }

  bookHandle = rest => this.setState({ booked: rest })

  handleSearch = (query) => { if(query) this.props.fetchSearchResults(query) }

  signOut = () => {
    firebase.auth().signOut();
    this.setState({
      isLoggedIn: false
    })
    this.props.signOut()
    window.location.replace("/")
  }
  render() {
   //console.log(this.props)
    return (
      <BrowserRouter>
        <div>
          <Header 
            uiConfig={this.uiConfig} 
            isLoggedIn={this.state.isLoggedIn} 
            handleSearch={this.handleSearch} 
            signIn={this.signIn}
            signOut={this.signOut}
            />
          <div className="content">
          <NavContent home={this.home}/>
          <Switch>
            <Route path="/" render={()=><Home bookHandle={this.bookHandle}/>} exact/>
            <Route path="/user" render={()=><Profile/>} exact/>
            <Route path="/bookings" render={()=><Booking/>}exact/>
            <Route path="/restaurants?book" render={() => <BookTable rest={this.state.booked} email={this.state.user.email}/>} exact/>
          </Switch>
        </div>
        <Footer/>
      </div>
    </BrowserRouter>
    );
  }
}
const mapStateToProps = state => ({
  state
})
const mapDispatchToProps = dispatch => ({
  fetchTrending: () => dispatch(fetchTrending()),
  fetchSearchResults : (query) => dispatch(fetchSearchResults(query)),
  getUserInfo : (user) => dispatch(getUserInfo(user)),
  signOut : () => dispatch(signOut())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);

