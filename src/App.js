import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './styles/App.css';
import RestAPI from './components/RestAPI'
import Header from './components/Header';
import NavContent from './components/NavContent';
import Home from './components/Home';
import User from './components/User';
import Booking from './components/Booking';
import Footer from './components/Footer';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
        title : "Zomato",
        trending : [],
        isTrending : false,
        searchResults : [],
        isSearch : false

    }
   
}
  getTrending = () =>{
    RestAPI.getTrending()
    .then(res => res.json())
    .then(rest => {this.setState({trending : rest, isTrending : true})})
  }
  componentDidMount(){
    this.getTrending()
  }
  home = () =>{
    this.setState({isSearch : false})
  }
  handleSearch = (query) =>{
    if(query) { this.setState({isTrending : false}) 
    RestAPI.getSearchResults(query)
    .then(res => res.json())
    .then(rest => this.setState({searchResults : rest, isSearch : true}))
  } else this.setState({isTrending : true})
  }

  render() {
    let restaurants = !this.state.isSearch ? this.state.trending : this.state.searchResults;
    let heading = !this.state.isSearch ? "trending this week...." : `Search results.... found ${this.state.searchResults.length} restaurants`
    return (
      <BrowserRouter>
        <div>
          <Header title={this.state.title} handleSearch={this.handleSearch} />
          <div className="content">
          <NavContent home={this.home}/>
          <Switch>
            <Route path="/" render={()=><Home  props={restaurants} heading={heading}/>} exact/>
            <Route path="/user" component={User} exact/>
            <Route path="/bookings" component={Booking} exact/>
          </Switch>
        </div>
        <Footer/>
      </div>
    </BrowserRouter>
    );
  }
}

export default App;
