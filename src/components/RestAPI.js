let getTrending = () =>{
    return fetch(`http://localhost:4000/api/restaurants/trending`)
}
let getSearchResults = (query) =>{
   return fetch(`http://localhost:4000/api/restaurants/search/${query}`)
}
module.exports  = {getTrending, getSearchResults}