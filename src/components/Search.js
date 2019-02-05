import React , {Component} from 'react';

import Appcontent from './AppContent';
import { connect } from 'react-redux'

class Search extends Component{
    render(){
        const {results, heading, bookHandle} = this.props
        console.log(this.props)
    if(this.props.results){
        return(
            <div className="home">
                <Appcontent 
                   trending={results} 
                   title={heading} 
                   bookHandle={bookHandle}/>
            </div>
        )   
       }
    else return(
        <div>
            Loading/\/\/\/\/\/\/\/\/\/\\/Loading
        </div>
        )}
}
const mapStateToProps = state => ({
    state
    })
export default connect(mapStateToProps)(Search);