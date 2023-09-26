import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import recipeService from '../services/recipes'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const user = action.payload
      window.localStorage.setItem('loggedRecipeAppUser', JSON.stringify(user))
      recipeService.setToken(user.token)
      return user
    },
    checkIfLoggedIn() {
      const loggedInUserJSON = window.localStorage.getItem(
        'loggedRecipeAppUser',
      )
      if (loggedInUserJSON) {
        const user = JSON.parse(loggedInUserJSON)
        recipeService.setToken(user.token)
        return user
      }
    },
    logout() {
      window.localStorage.removeItem('loggedRecipeAppUser')
      return null
    },
  },
})

export const { setUser, checkIfLoggedIn, logout } = userSlice.actions

export const login = (userInfo) => {
  return async (dispatch) => {
    try {
      const loggedInUser = await loginService.login(userInfo)
      //console.log(loggedInUser)
      dispatch(setUser(loggedInUser))
    } catch (exception) {
      //console.log(exception)
      dispatch(setNotification('Wrong credentials', 10))
    }
  }
}

export default userSlice.reducer
