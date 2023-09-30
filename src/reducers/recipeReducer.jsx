import { createSlice } from '@reduxjs/toolkit'
import recipeService from '../services/recipes'
import userService from '../services/users'

const recipeSlice = createSlice({
  name: 'recipes',
  initialState: [],
  reducers: {
    appendRecipe(state, action) {
      state.push(...action.payload)
    },
    setRecipes(state, action) {
      return action.payload
    },
    toggleFavorite(state, action) {
      const recipeToChange = {
        ...action.payload,
        favorite: !action.payload.favorite,
      }

      const newResults = state.results.map((recipe) =>
        recipe.id !== recipeToChange.id ? recipe : recipeToChange,
      )
      state.results = newResults
      return state
    },
  },
})

export const { appendRecipe, setRecipes, toggleFavorite } = recipeSlice.actions

export const getRecipes = (recipe, user) => {
  return async (dispatch) => {
    const recipes = await recipeService.getDefaultSearch(recipe)
    console.log(recipes)
    if (user || window.localStorage.getItem('loggedRecipeAppUser')) {
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
    dispatch(toggleFavorite(recipeObj))
  }
}

export default recipeSlice.reducer
