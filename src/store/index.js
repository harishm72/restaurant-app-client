import { createStore , applyMiddleware, compose, } from 'redux';
import thunk from 'redux-thunk';
import firebase from 'firebase';

import reducer from './reducers'

firebase.initializeApp({
  apiKey : `AIzaSyAHhjLb5eQBxPJQqQhnVGX1GP9jORRbHC4`,
  authDomain : `zomato-project-71102.firebaseapp.com`
})

const middleware = [thunk];

const initialState = {}

const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );

store.subscribe(() => {
    console.log(store.getState())
})

export default store;