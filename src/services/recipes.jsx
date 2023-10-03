import axios from 'axios'
const baseUrl = `https://my-cookbook-usi7.onrender.com/api/recipes`

let token = null

const getToken = () => {
  return token
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const resetToken = () => {
  token = null
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

const favorite = async (recipeObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, recipeObject, config)
  return response.data
}

const remove = async (recipeId) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${recipeId}`, config)
  return response.data
}

export default {
  getDefaultSearch,
  setToken,
  getRecipeInfo,
  favorite,
  getToken,
  remove,
  resetToken,
}
