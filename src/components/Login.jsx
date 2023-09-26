import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()

    dispatch(
      login({
        username,
        password,
      }),
    )
    setUsername('')
    setPassword('')
    navigate('/')
  }

  return (
    <div className='dark:bg-gray-900 flex flex-grow bg-gray-100 pb-8'>
      <div className='mx-auto flex w-full flex-col items-center justify-center px-6'>
        <p className='dark:text-white mb-6 text-3xl font-semibold md:text-5xl'>
          Welcome
        </p>
        <div className='w-full space-y-4 rounded-lg bg-white px-6 py-8 shadow sm:max-w-md'>
          <p className='text-xl font-bold md:text-2xl'>
            Sign in to your account
          </p>
          <form onSubmit={handleLogin} className='space-y-4 md:space-y-6 '>
            <div>
              <label className='mb-2 block text-sm font-medium'>Username</label>
              <input
                placeholder='username...'
                value={username}
                onChange={({ target }) => setUsername(target.value)}
                className='focus:ring-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-lg focus:border-blue-600'
              ></input>
            </div>
            <div>
              <label className='mb-2 block text-sm font-medium'>Password</label>
              <input
                placeholder='••••••••'
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                className='focus:ring-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-lg font-extrabold focus:border-blue-600'
                type='password'
              ></input>
            </div>

            <button className='w-full rounded-lg bg-blue-600 py-2 text-sm text-white hover:bg-blue-700'>
              Sign in
            </button>
            <p className='text-sm font-light text-gray-500'>
              Don't have account yet?{' '}
              <a href='#' className='font-medium text-blue-600 hover:underline'>
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
