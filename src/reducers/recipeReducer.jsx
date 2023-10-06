import { createSlice } from '@reduxjs/toolkit'
import recipeService from '../services/recipes'
import userService from '../services/users'
import cloneDeep from 'lodash/cloneDeep'

const recipeSlice = createSlice({
  name: 'recipes',
  initialState: { recipes: [], loading: false },
  reducers: {
    appendRecipe(state, action) {
      state.push(...action.payload)
    },
    setRecipes(state, action) {
      return { recipes: action.payload, loading: false }
    },
    toggleFavorite(state, action) {
      const recipeToChange = {
        ...action.payload,
        favorite: !action.payload.favorite,
      }
      const stateObj = cloneDeep(state)
      console.log(stateObj)
      const newResults = state.recipes.results.map((recipe) =>
        recipe.id !== recipeToChange.id ? recipe : recipeToChange,
      )
      state.recipes.results = newResults
      return { ...state }
    },
    loadState(state, action) {
      return { ...state, loading: true }
    },
  },
})

export const { appendRecipe, setRecipes, toggleFavorite, loadState } =
  recipeSlice.actions

export const getRecipes = (recipe, user) => {
  return async (dispatch) => {
    dispatch(loadState())
    const recipes = await recipeService.getDefaultSearch(recipe)
    console.log(recipes)
    console.log('THis is lcoal storage')
    console.log(window.localStorage.getItem('loggedRecipeAppUser'))
    if (
      (user || window.localStorage.getItem('loggedRecipeAppUser')) &&
      window.localStorage.getItem('loggedRecipeAppUser') !== undefined
    ) {
      const usersFavoriteRecipes = await userService.getFavorites()
      const userFavoriteIds = usersFavoriteRecipes.map(
        (recipe) => recipe.spoonId,
      )

      const resultsFinal = recipes.results.map((recipe) =>
        userFavoriteIds.includes(recipe.id)
          ? {
              ...recipe,
              favorite: true,
            }
          : {
              ...recipe,
              favorite: false,
            },
      )
      //console.log(resultsFinal)
      //console.log(usersFavoriteRecipes)
      recipes.results = resultsFinal
    }
    //console.log(recipes)
    dispatch(setRecipes(recipes))
  }
}

export const resetRecipes = () => {
  return async (dispatch) => {
    console.log('test')
    dispatch(setRecipes([]))
  }
}

export const changeFavorite = (recipeObj) => {
  return async (dispatch) => {
    console.log(recipeObj)
    dispatch(toggleFavorite(recipeObj))
  }
}

export default recipeSlice.reducer
