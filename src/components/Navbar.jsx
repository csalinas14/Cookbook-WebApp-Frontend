import { useState } from 'react'

const Navbar = () => {
  const [hideMobileMenu, setHideMobileMenu] = useState(true)

  //console.log(hideMobileMenu)
  const toggleMobileMenu = (event) => {
    //event.preventDefault()
    setHideMobileMenu(!hideMobileMenu)
  }
  const hidden = hideMobileMenu ? 'top-[-100%]' : 'top-[7%]'
  //console.log(hidden)
  return (
    <nav className='m:w-[92%] mx-auto flex w-full items-center justify-between px-3 py-1'>
      <div
        className={`absolute left-0 ${hidden} z-10 flex min-h-[30vh] w-full items-center bg-white px-4 md:static md:min-h-fit md:w-auto`}
      >
        <ul className='flex flex-col gap-8 md:flex-row md:items-center md:gap-[4vw]'>
          <li>
            <a className='hover:text-gray-500' href='#'>
              Home
            </a>
          </li>
          <li>
            <a href='#' className='hover:text-gray-500'>
              Favorites
            </a>
          </li>
          <li>
            <a href='#' className='hover:text-gray-500'>
              Login
            </a>
          </li>
        </ul>
      </div>
      <div className='flex flex-row-reverse items-center gap-6'>
        <button className='rounded-full bg-[#a6c1ee] px-5 py-2 text-white hover:bg-[#87acec]'>
          Sign In
        </button>
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
