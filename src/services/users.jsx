import axios from 'axios'
import recipeService from './recipes'

const baseUrl = 'api/users'

const create = async (signupObject) => {
  const response = await axios.post(baseUrl, signupObject)
  return response.data
}

const getFavorites = async () => {
  const token = recipeService.getToken()
  //console.log(token)
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(`${baseUrl}/favorites`, config)
  return response.data
}
export default { create, getFavorites }
