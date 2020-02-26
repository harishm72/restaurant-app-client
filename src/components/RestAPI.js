const userId = "5c49a6b8251c5c0f321b1a2a";
const userName = "harish"

let getTrending = () =>{
    return fetch(`http://localhost:4000/api/restaurants/trending`)
}

let getRestaurant  = (id) =>{
   return fetch(`http://localhost:4000/api/restaurants/${id}` , {
      headers : {
         'Content-Type': 'application/json',
         'Accept': 'application/json',
         }
      }
   )
}
let userSignup = (email, details) =>{
   return fetch(`http://localhost:4000/api/user`, {
      method : 'POST',
      headers : {
         'Content-Type': 'application/json',
         'Accept': 'application/json',
         "email" : email
         },
      body : JSON.stringify(details)

   })
}
let updateProfile = (email, newData) =>{
   return fetch(`http://localhost:4000/api/user/update`,{
      method : 'POST',
      headers : {
         'Content-Type': 'application/json',
         'Accept': 'application/json',
         "email" : email
         },
      body : JSON.stringify(newData)
  })
}
let getBookings = (email) =>{
   console.log(email)
   return fetch(`http://localhost:4000/api/bookings/`, {
      headers : {
         'Content-Type': 'application/json',
         'Accept': 'application/json',
         "email" : email
         }
   })
}
let bookTable = (email, post) =>{
   return fetch(`http://localhost:4000/api/bookings`, {
      headers : {
         'Content-Type': 'application/json',
         'Accept': 'application/json',
         "email" : email
         },
      method : 'POST',
      body : JSON.stringify(post)
      }
   )
}

let getSearchResults = (query) =>{
   return fetch(`http://localhost:4000/api/restaurants/search/${query}`)
}
let getUser = (email) =>{
   return fetch(`http://localhost:4000/api/user/${email}`, {
      headers : {
         'Content-Type': 'application/json',
         'Accept': 'application/json',
         "email" : email
         }
      })
}

module.exports  = {getTrending, getRestaurant, updateProfile, userSignup, 
                  getBookings, getSearchResults, 
                  getUser, bookTable}