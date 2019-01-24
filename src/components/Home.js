import React , {Component} from 'react';

import Appcontent from './AppContent';

class Home extends Component{
    render(){
     return(
         <div className="home">
             <Appcontent trending={this.props.props} title={this.props.heading}/>
         </div>
     )   
    }
}

export default Home;