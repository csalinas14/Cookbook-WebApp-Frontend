import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { checkIfLoggedIn, logout } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(({ user }) => user)
  console.log(user)

  const [hideMobileMenu, setHideMobileMenu] = useState(true)

  useEffect(() => {
    dispatch(checkIfLoggedIn())
  }, [])

  //console.log(hideMobileMenu)
  const toggleMobileMenu = (event) => {
    //event.preventDefault()
    setHideMobileMenu(!hideMobileMenu)
  }
  const hidden = hideMobileMenu ? 'top-[-100%]' : 'top-[6.5%]'
  const allowHidingMenu =
    hidden == 'top-[6.5%]' ? () => toggleMobileMenu() : null

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logout())
    if (hidden == 'top-[6.5%]') {
      toggleMobileMenu()
    }
    navigate('/')
  }

  const handleSignUpBtn = (event) => {
    event.preventDefault()
    navigate('/signup')
  }

  //console.log(hidden)
  return (
    <nav className='m:w-[92%] mx-auto flex w-full items-center justify-between px-3 py-1'>
      <div
        className={`absolute left-0 ${hidden} z-10 flex min-h-[30vh] w-full items-center bg-white px-4 md:static md:min-h-fit md:w-auto`}
      >
        <ul className='flex flex-col gap-8 md:flex-row md:items-center md:gap-[4vw]'>
          <li>
            <Link
              className='hover:text-gray-500'
              to='/'
              onClick={allowHidingMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <a href='#' className='hover:text-gray-500'>
              Favorites
            </a>
          </li>
          {!user ? (
            <li>
              <Link
                className={`hover:text-gray-500`}
                to='/login'
                onClick={allowHidingMenu}
              >
                Login
              </Link>
            </li>
          ) : (
            <li onClick={handleLogout} className='hover:text-gray-500'>
              Logout
            </li>
          )}
        </ul>
      </div>
      <div className='flex w-full flex-row-reverse items-center justify-between gap-6'>
        <div className='flex flex-row-reverse items-center gap-3'>
          <button
            onClick={handleSignUpBtn}
            className='rounded-full bg-blue-600 px-5 py-2 text-white hover:bg-blue-700'
          >
            Sign Up
          </button>
          {user && <p className='font-light italic'>Hey {user.name}!</p>}
        </div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          onClick={() => toggleMobileMenu()}
          className='h-6 w-6 cursor-pointer text-3xl md:hidden'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
          />
        </svg>
      </div>
    </nav>
  )
}

export default Navbar
