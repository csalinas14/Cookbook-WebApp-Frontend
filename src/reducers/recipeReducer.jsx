import { createSlice } from '@reduxjs/toolkit'
import recipeService from '../services/recipes'

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
  },
})

export const { appendRecipe, setRecipes } = recipeSlice.actions

export const getRecipes = (recipe) => {
  return async (dispatch) => {
    const recipes = await recipeService.getDefaultSearch(recipe)
    //console.log(recipes)
    dispatch(setRecipes(recipes))
  }
}

export const resetRecipes = () => {
  return async (dispatch) => {
    dispatch(setRecipes([]))
  }
}

export default recipeSlice.reducer
