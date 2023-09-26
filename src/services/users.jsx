import axios from 'axios'
const baseUrl = 'api/users'

const create = async (signupObject) => {
  const response = await axios.post(baseUrl, signupObject)
  return response.data
}

export default { create }
