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