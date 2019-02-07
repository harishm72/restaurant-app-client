import React from 'react';
import RestAPI from './RestAPI';
import { connect } from 'react-redux'

class Booking extends React.Component {
    render(){
        if(!this.props.bookings){
            return <div>Login / SignUp to view this section</div>
        }
        if(this.props.bookings.bookings){ 
        return <div className="user-bookings">
                    <h5>My bookings......</h5>
                    <div className="bookings-list">
                    {this.props.bookings.bookings.map((booking,key) => <Booked rest={booking} key={key}/>)}
                    </div>
                   
                </div>
        }
    return <div>looks like you don't have any bookings.....</div>
    }
}
class Booked extends React.Component{
    constructor(props){
        super(props)
        this.state = ({
            rest : ""
        })
    }
    componentDidMount(){
        RestAPI.getRestaurant(this.props.rest.id)
        .then(res => res.json())
        .then(current => this.setState({rest : current}))
    }

    render(){
        if(!this.state.rest){
            return<p>Loading...........</p>
        }
     return(
            <div>
                <div className="booking-item">
                    <img className="booking-item-image" src={this.state.rest.featured_image} alt=""></img>
                    <div>
                        <p className="booking-item-name">{this.state.rest.name}</p>
                    </div>
                    <div>
                        <p>{this.state.rest.location.locality}</p>
                        <p>{this.state.rest.location.city}</p>
                    </div>
                    <div>
                        {this.props.rest.guests}
                    </div>
                    <div>
                        <p>Date : {this.props.rest.date}</p>
                        <p>Time :{this.props.rest.session}</p>
                    </div>
                </div>
            </div>
     )   
    }
}
const mapStateToProps = state => ({
    bookings : state.userDetails.user
  })
export default connect(mapStateToProps)(Booking);