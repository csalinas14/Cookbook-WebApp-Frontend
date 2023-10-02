import 'dotenv/config'

const API_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.API_URL
    : 'http://localhost:3003'

export default { API_URL }
