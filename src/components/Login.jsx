import { useState } from 'react'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className='dark:bg-gray-900 bg-gray-50'>
      <div className='mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen'>
        <p className='dark:text-white mb-6 text-3xl font-semibold'>Welcome</p>
        <div className='w-full space-y-4 rounded-lg bg-white px-6 py-4 shadow'>
          <p className='text-xl font-bold'>Sign in to your account</p>
          <form className='space-y-4 '>
            <div>
              <label className='mb-2 block text-sm font-medium'>Username</label>
              <input
                placeholder='username...'
                className='focus:ring-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-lg focus:border-blue-600'
              ></input>
            </div>
            <div>
              <label className='mb-2 block text-sm font-medium'>Password</label>
              <input
                placeholder='••••••••'
                className='focus:ring-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-lg focus:border-blue-600'
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
