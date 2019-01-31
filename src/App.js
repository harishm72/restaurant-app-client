import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './styles/App.css';
import RestAPI from './components/RestAPI'
import Header from './components/Header';
import NavContent from './components/NavContent';
import Home from './components/Home';
import Profile from './components/Profile';
import Booking from './components/Booking';
import BookTable from './components/BookTable';
import Footer from './components/Footer';
import firebase from 'firebase';

firebase.initializeApp({
  apiKey : `AIzaSyAHhjLb5eQBxPJQqQhnVGX1GP9jORRbHC4`,
  authDomain : `zomato-project-71102.firebaseapp.com`
})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      title: "Zomato",
      trending: [],
      isTrending: false,
      searchResults: [],
      isSearch: false,
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
  getTrending = () => {
    RestAPI.getTrending()
      .then(res => res.json())
      .then(rest => {
        this.setState({
          trending: rest,
          isTrending: true
        })
      })
  }
  componentDidMount = () => {
    this.getTrending();
    firebase.auth().onAuthStateChanged(currentUser => {
      this.setState({
        isLoggedIn: !!currentUser,
        email: currentUser.email
      })
      RestAPI.getUser(currentUser.email)
        .then(res => res.json())
        .then(thisUser => {
          if (!thisUser) {
            let details = {
              displayName: currentUser.displayName,
              email: currentUser.email,
              phoneNumber: currentUser.phoneNumber,
              photoURL: currentUser.photoURL,
              paymentMode : ""
            }
            RestAPI.userSignup(currentUser.email, details)
              .then(res => this.setState({
                user: thisUser
              }))
          } else this.setState({
            user: thisUser
          })
        })
    })
  }
  home = () => this.setState({
    isSearch: false
  })

  getRestaurant = rest => this.setState({
    booked: rest
  })

  handleSearch = (query) => {
    if (query) {
      this.setState({
        isTrending: false
      })
      RestAPI.getSearchResults(query)
        .then(res => res.json())
        .then(rest => this.setState({
          searchResults: rest,
          isSearch: true
        }))
    } else this.setState({
      isTrending: true
    })
  }
  getUser = (email) => {

  }
  signOut = () => {
    firebase.auth().signOut();
    this.setState({
      isLoggedIn: false
    })
  }
  render() {
    let restaurants = !this.state.isSearch ? this.state.trending : this.state.searchResults;
    let heading = !this.state.isSearch ? "Trending this week...." : `Search results.... found ${this.state.searchResults.length} restaurants`
    return (
      <BrowserRouter>
        <div>
          <Header 
            title={this.state.title} 
            uiConfig={this.uiConfig} 
            isLoggedIn={this.state.isLoggedIn} 
            handleSearch={this.handleSearch} 
            signIn={this.signIn}
            signOut={this.signOut}
            />
          <div className="content">
          <NavContent home={this.home}/>
          <Switch>
            <Route path="/" render={()=><Home  
                props={restaurants} 
                heading={heading} 
                bookHandle={this.getRestaurant}/>} exact/>
            <Route path="/user" render={()=><Profile  user={this.state.user}/>} exact/>
            <Route path="/bookings" render={()=><Booking  email={this.state.user.email}/>}exact/>
            <Route path="/restaurants?book" render={() => <BookTable rest={this.state.booked} email={this.state.user.email}/>} exact/>
          </Switch>
        </div>
        <Footer/>
      </div>
    </BrowserRouter>
    );
  }
}

export default App;
