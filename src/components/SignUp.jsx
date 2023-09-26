import { useState } from 'react'
import userService from '../services/users'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const navigate = useNavigate()

  const [displayName, setDisplayName] = useState('')
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [termsBox, setTermsBox] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const userObject = {
      username,
      password,
      name: displayName,
    }

    console.log(userObject)
    console.log(confirmPass)
    console.log(termsBox)

    try {
      if (password == confirmPass && termsBox) {
        await userService.create(userObject)
        setDisplayName('')
        setUserName('')
        setPassword('')
        setConfirmPass('')
        setTermsBox(false)
        navigate('/login')
      } else {
        console.log('error')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex flex-grow bg-gray-100 pb-8'>
      <div className='mx-auto flex w-full flex-col items-center justify-center px-6'>
        <p className='mb-6 text-3xl font-semibold md:text-5xl'>Sign Up</p>
        <div className='w-full space-y-4 rounded-lg bg-white p-4 px-6 py-8 shadow'>
          <p className='text-xl font-bold'>Create an account</p>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4 text-sm'>
            <div>
              <p className='mb-2 font-medium'>Username</p>
              <input
                placeholder='Enter a username...'
                value={username}
                onChange={({ target }) => setUserName(target.value)}
                className='block w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-lg focus:border-blue-600 focus:ring-blue-600'
              ></input>
            </div>
            <div>
              <p className='mb-2 font-medium'>Display Name</p>
              <input
                placeholder='Enter a display name...'
                value={displayName}
                onChange={({ target }) => setDisplayName(target.value)}
                className='block w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-lg focus:border-blue-600 focus:ring-blue-600'
              ></input>
            </div>
            <div>
              <p className='mb-2 font-medium'>Password</p>
              <input
                placeholder='••••••••'
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                type='password'
                className='bold block w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-lg font-extrabold focus:border-blue-600 focus:ring-blue-600'
              ></input>
            </div>
            <div>
              <p className='mb-2 font-medium'>Confirm Password</p>
              <input
                placeholder='••••••••'
                value={confirmPass}
                onChange={({ target }) => setConfirmPass(target.value)}
                type='password'
                className='block w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-lg font-extrabold focus:border-blue-600 focus:ring-blue-600'
              ></input>
            </div>
            <div className='flex items-start'>
              <div className='flex h-5 items-center'>
                <input
                  type='checkbox'
                  onClick={() => setTermsBox(!termsBox)}
                  className='focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300'
                ></input>
              </div>
              <div className='ml-3 text-sm'>
                <p className='font-light text-gray-500'>
                  I accept the{' '}
                  <a
                    href='#'
                    className='font-medium text-blue-600 hover:underline'
                  >
                    Terms and Conditions
                  </a>
                </p>
              </div>
            </div>
            <button className='w-full rounded-lg bg-blue-600 px-5 py-3 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300'>
              Create an account
            </button>
            <p className='text-sm font-light text-gray-500'>
              Already have an account?{' '}
              <a href='#' className='font-medium text-blue-600 hover:underline'>
                Login here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp
