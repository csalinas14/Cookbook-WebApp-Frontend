import { configureStore, applyMiddleware, compose } from '@reduxjs/toolkit'
import recipeReducer from './reducers/recipeReducer'
import userReducer from './reducers/userReducer'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = configureStore({
  reducer: {
    recipes: recipeReducer,
    user: userReducer,
  },
})
/* eslint-enable */
export default store
