
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
let getUser = (email) =>{
   return fetch(`http://localhost:4000/api/user/${email}`, {
      headers : {
         'Content-Type': 'application/json',
         'Accept': 'application/json',
         "email" : email
         }
      })
}

module.exports  = { getRestaurant, updateProfile, userSignup, 
                  getBookings, 
                  getUser, bookTable}