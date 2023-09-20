import axios from 'axios'
const baseUrl = '/api/recipes'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

//used for standard recipe search
const getDefaultSearch = async (recipeString) => {
  const url = `${baseUrl}/recipeSearch/${recipeString}`
  console.log(recipeString)
  const response = await axios.get(url)
  return response.data
}

export default { getDefaultSearch, setToken }
