import React from 'react';
import RestAPI from './RestAPI';

class Booking extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                bookings : []
            }
        }
        componentDidMount(){
            RestAPI.getBookings(this.props.email)
            .then(res => res.json())
            .then(allBookings => this.setState({bookings : allBookings}))
            .catch(err => window.location.href = "/")
        }
    render(){
        if(this.state.bookings){ 
        return <div className="user-bookings">
                    <h5>My bookings......</h5>
                    <div className="bookings-list">
                    {this.state.bookings.map((booking,key) => <Booked rest={booking} key={key}/>)}
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
export default Booking;