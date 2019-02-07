import { combineReducers } from 'redux'
import  {restaurants} from './Restaurants'
import  {userDetails} from './Userdetails'
import  {booking} from './Booking'
export default combineReducers({
  restaurants,
  userDetails,
  booking
})