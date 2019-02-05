import { combineReducers } from 'redux'
import  {restaurants, userDetails} from './Reducer'
export default combineReducers({
  restaurants,
  userDetails
})