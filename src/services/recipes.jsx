import axios from 'axios'
const baseUrl = '/api/recipes'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

//used for standard recipe search
const getDefaultSearch = async ({ recipeString, page }) => {
  if (page < 1) page = 1
  const url = `${baseUrl}/recipeSearch?recipe=${recipeString || ''}&page=${
    page || 1
  }`
  console.log(recipeString)
  const response = await axios.get(url)
  return response.data
}

const getRecipeInfo = async (id) => {
  console.log('test')
  const url = `${baseUrl}/recipeSearch/${id}`
  const response = await axios.get(url)
  console.log(response)
  return response.data
}

export default { getDefaultSearch, setToken, getRecipeInfo }
