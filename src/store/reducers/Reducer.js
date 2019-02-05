export const restaurants = (state = {}, action) => {

    switch (action.type) {
        case 'FETCH_TRENDING':
            return {
                ...state,
                trends: action.trends,
                isSearch: false,
            }
        case 'FETCH_SEARCH':
            return {
                ...state,
                results: action.results,
                isSearch: true,
            }
        default:
            return state;
    }
}
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

        default:
            return state;
    }
}
export const bookings = (state = {}, action) =>{

    switch(action.type){
        
        case 'BOOK_TABLE':
        return {
            ...state,
            
        }


        default:
        return state;
    }
}