import { configureStore } from '@reduxjs/toolkit'
import recipeReducer from './reducers/recipeReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    recipes: recipeReducer,
    user: userReducer,
  },
})

export default store
