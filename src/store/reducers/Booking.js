export const booking = (state = {}, action) =>{

    switch(action.type){
        
        case 'BOOK_TABLE':
        return {
            ...state,
            email : action.email,
            rest : action.rest
        }
        default:
        return state;
    }
}