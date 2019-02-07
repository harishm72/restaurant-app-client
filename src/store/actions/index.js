export const signOut = () => ({
  type: 'SIGN_OUT',
})
export const fetchTrending = () => dispatch => {
  fetch(`http://localhost:4000/api/restaurants/trending`)
    .then(res => res.json())
    .then(trends =>
      dispatch({
        type: 'FETCH_TRENDING',
        trends
      })
    );
};

export const fetchSearchResults = (query) => dispatch => {
  return fetch(`http://localhost:4000/api/restaurants/search/${query}`)
    .then(res => res.json())
    .then(results =>
      dispatch({
        type: 'FETCH_SEARCH',
        results
      })
    );
};
export const getRestaurant = (id) => dispatch => {
  return fetch(`http://localhost:4000/api/restaurants/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    }).then(res => res.json())
    .then(restaurant => dispatch({
      type: 'GET_RESTAURANT',
      restaurant
    }))
}
export const getUserInfo = (currentUser) => dispatch => {
  return fetch(`http://localhost:4000/api/user/${currentUser.email}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "email": currentUser.email
      }
    }).then(res => res.json())
    .then(thisUser => {
      if (!thisUser) {
        let details = {
          displayName: currentUser.displayName,
          email: currentUser.email,
          phoneNumber: currentUser.phoneNumber,
          photoURL: currentUser.photoURL,
          paymentMode: ""
        }
        fetch(`http://localhost:4000/api/user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "email": details.email
          },
          body: JSON.stringify(details)
        }).then(dispatch({
          type: "SIGN_IN",
          user: thisUser
        }))
      } else dispatch({
        type: "SIGN_IN",
        user: thisUser
      })
    })
}

export const bookTable = (email, id) => dispatch =>{
  return fetch(``)
}