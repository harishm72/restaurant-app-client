export const userDetails = (state = {}, action) => {
    switch (action.type) {

        case 'SIGN_IN':
            return {
                ...state,
                user: action.user
            }

        case 'SIGN_OUT':
            return {
                ...state,
                user: {}
            }
        case 'BOOKING_CONFIRM':
        console.log(state)
        return {
            ...state,
            bookings : [...state.bookings, action.post] 
        }
        default:
            return state;
    }
}