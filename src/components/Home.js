import React, { Component } from 'react';

import Appcontent from './AppContent';
import { connect } from 'react-redux'

class Home extends Component {
    render() {
        const { trends, isSearch, bookHandle, results} = this.props
        let rests = isSearch ? results : trends
        let heading = isSearch ? `found ${results.length} restaurants` : `Trending this week...`
        if (rests) {
            return (
                <div className="home">
                    <Appcontent
                        restaurants={rests}
                        title={heading}
                        bookHandle={bookHandle} />
                </div>
            )
        }
        else return (
            <div>
                Loading/\/\/\/\/\/\/\/\/\/\/\Loading
        </div>
        )
    }
}
const mapStateToProps = state => ({
    trends : state.restaurants.trends,
    results : state.restaurants.results,
    isSearch : state.restaurants.isSearch
})
export default connect(mapStateToProps)(Home);