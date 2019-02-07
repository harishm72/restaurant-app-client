export const booking = (state = {}, action) =>{

    switch(action.type){
        
        case 'BOOK_TABLE':
        return {
            ...state,
        }
        default:
        return state;
    }
}