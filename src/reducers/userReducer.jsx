import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import loginService from '../services/login'
import recipeService from '../services/recipes'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import userService from '../services/users'

const initialState = {
  loading: null,
  user: null,
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
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
      console.log(state)
      if (loggedInUserJSON) {
        const user = JSON.parse(loggedInUserJSON)
        recipeService.setToken(user.token)
        const stateObj = cloneDeep(state)
        console.log(stateObj)
        stateObj.user = user
        return stateObj
        /*
        return {
          ...state,
          user: user,
        }
        */
      }
    },
    logout() {
      window.localStorage.removeItem('loggedRecipeAppUser')
      recipeService.resetToken()
      return initialState
    },
    addFavorite(state, action) {
      const newFav = action.payload
      const stateObj = cloneDeep(state)
      console.log(stateObj)
      stateObj.user.recipes.push(newFav)
      //state.user.recipes.push(newFav)
      window.localStorage.setItem(
        'loggedRecipeAppUser',
        JSON.stringify(stateObj.user),
      )
      return stateObj
    },
    removeFavorite(state, action) {
      const unFavId = action.payload
      console.log(unFavId)
      //console.log(state.user)
      const stateObj = cloneDeep(state)
      const recipesArr = cloneDeep(state.user.recipes)
      //const stateRecipes = state.user.recipes
      //console.log(stateRecipes)
      const filterRecipes = recipesArr.filter(
        (recipe) => recipe.spoonId !== unFavId,
      )
      console.log(filterRecipes)
      //state.user.recipes = filterRecipes
      stateObj.user.recipes = filterRecipes
      window.localStorage.setItem(
        'loggedRecipeAppUser',
        JSON.stringify(stateObj.user),
      )
      return stateObj
      /*
      return {
        ...state,
        recipes: filterRecipes,
      }
      */
    },
    setFavorites(state, action) {
      const currentFavorites = action.payload
      const stateObj = cloneDeep(state)
      stateObj.user.recipes = currentFavorites
      return stateObj
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        return {
          loading: true,
          user: null,
          error: null,
        }
        //;(state.loading = true), (state.user = null), (state.error = null)
      })
      .addCase(login.fulfilled, (state, action) => {
        //console.log(state)
        return {
          loading: false,
          user: action.payload,
          error: null,
        }
        /*
        ;(state.loading = false),
          (state.user = action.payload),
          (state.error = null)
          */
      })
      .addCase(login.rejected, (state, action) => {
        const objToReturn = {
          loading: false,
          user: null,
        }
        //state.loading = false
        //state.user = null
        //console.log(action)
        if (action.error.message === 'Request failed with status code 401') {
          //console.log('tessaf')
          //state.error = 'Invalid Credentials! Please try again!'
          objToReturn.error = 'Invalid Credentials! Please try again!'
        } else {
          //state.error = action.error.message
          objToReturn.error = action.error.message
        }
        return objToReturn
      })
  },
})

export const {
  setUser,
  checkIfLoggedIn,
  logout,
  addFavorite,
  removeFavorite,
  setFavorites,
} = userSlice.actions

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

export const getCurrentFavorites = () => {
  return async (dispatch) => {
    try {
      const favorites = await userService.getFavorites()
      console.log(favorites)
      dispatch(setFavorites(favorites))
    } catch (error) {
      console.log(error)
    }
  }
}

export default userSlice.reducer
