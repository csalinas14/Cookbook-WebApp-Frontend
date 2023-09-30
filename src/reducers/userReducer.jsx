import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import loginService from '../services/login'
import recipeService from '../services/recipes'
import { useNavigate } from 'react-router-dom'

const initialState = {
  loading: null,
  user: null,
  error: null,
}

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
    checkIfLoggedIn(state, action) {
      const loggedInUserJSON = window.localStorage.getItem(
        'loggedRecipeAppUser',
      )
      if (loggedInUserJSON) {
        const user = JSON.parse(loggedInUserJSON)
        recipeService.setToken(user.token)
        return {
          ...state,
          user: user,
        }
      }
    },
    logout() {
      window.localStorage.removeItem('loggedRecipeAppUser')
      recipeService.resetToken()
      return initialState
    },
    addFavorite(state, action) {
      const newFav = action.payload
      state.user.recipes.push(newFav)
      return state
    },
    removeFavorite(state, action) {
      const unFavId = action.payload
      const filterRecipes = state.user.recipes.filter(
        (recipe) => recipe.spoonId !== unFavId,
      )
      console.log(filterRecipes)
      state.user.recipes = filterRecipes
      return state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        ;(state.loading = true), (state.user = null), (state.error = null)
      })
      .addCase(login.fulfilled, (state, action) => {
        ;(state.loading = false),
          (state.user = action.payload),
          (state.error = null)
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.user = null
        //console.log(action)
        if (action.error.message === 'Request failed with status code 401') {
          //console.log('tessaf')
          state.error = 'Invalid Credentials! Please try again!'
        } else {
          state.error = action.error.message
        }
      })
  },
})

export const { setUser, checkIfLoggedIn, logout, addFavorite, removeFavorite } =
  userSlice.actions

export const loginold = (userInfo) => {
  return async (dispatch) => {
    try {
      const loggedInUser = await loginService.login(userInfo)
      //console.log(loggedInUser)
      dispatch(setUser(loggedInUser))
    } catch (exception) {
      console.log(exception)
      //dispatch(setNotification('Wrong credentials', 10))
    }
  }
}

export const login = createAsyncThunk('login', async (userInfo) => {
  const loggedInUser = await loginService.login(userInfo)
  window.localStorage.setItem(
    'loggedRecipeAppUser',
    JSON.stringify(loggedInUser),
  )
  recipeService.setToken(loggedInUser.token)
  //thunkAPI.dispatch(setUser(loggedInUser))
  return loggedInUser
})

export const favoriteRecipe = (recipeInfo) => {
  return async (dispatch) => {
    try {
      const favRecipe = await recipeService.favorite(recipeInfo)
      console.log(favRecipe)
      dispatch(addFavorite(favRecipe))
    } catch (error) {
      console.log(error)
    }
  }
}

export const unfavoriteRecipe = (recipeId) => {
  return async (dispatch) => {
    try {
      const unFavRecipe = await recipeService.remove(recipeId)
      console.log(unFavRecipe)
      dispatch(removeFavorite(recipeId))
    } catch (error) {
      console.log(error)
    }
  }
}

export default userSlice.reducer
