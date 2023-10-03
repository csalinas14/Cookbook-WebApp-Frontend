import axios from 'axios'
const baseUrl = 'https://my-cookbook-usi7.onrender.com/api/login'

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  //console.log(response.data)
  return response.data
}

export default { login }
