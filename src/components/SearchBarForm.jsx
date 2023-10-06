import { useState } from 'react'
import { getRecipes } from '../reducers/recipeReducer'
import { useSearchParams } from 'react-router-dom'

//button component no longer going to be used
/*
const SearchButton = ({ name, handleClick, type }) => {
  const active = type === name ? 'bg-blue-500' : 'bg-gray-100'
  //console.log(active)
  return (
    <button
      className={`cursor-none rounded-full px-2 py-2 text-sm outline-none ${active}`}
      onClick={({ target }) => handleClick(target, name)}
    >
      {name}
    </button>
  )
}*/

const SearchBarForm = () => {
  const [search, setSearch] = useState('')
  //const [searchType, setSearchType] = useState('Standard')
  const [searchParams, setSearchParams] = useSearchParams()

  const searchRecipes = (event) => {
    event.preventDefault()
    console.log(search)
    const searchObject = { recipeString: search, page: 1 }
    //dispatch(getRecipes(searchObject))
    setSearchParams(searchObject)
    setSearch('')
  }

  //old event for buttons no longer in use
  /*
  const handleDefault = (event, value) => {
    //event.preventDefault()
    //console.log(value)
    setSearchType(value)
  }*/

  return (
    <>
      <form className='w-full' onSubmit={searchRecipes}>
        <div className='relative flex items-center text-gray-400 focus-within:text-gray-600'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='pointer-events-none absolute ml-3 h-5 w-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
            />
          </svg>

          <input
            type='text'
            name='search'
            value={search}
            placeholder='Search recipes'
            autoComplete='off'
            aria-label='Search recipes'
            onChange={({ target }) => setSearch(target.value)}
            className='w-full rounded-2xl border-none py-2 pl-10 pr-3 font-semibold text-black placeholder-gray-400 ring-2 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
          ></input>
        </div>
      </form>

      {/** old buttons no longer going to be implemented
       
      <div className='flex justify-between'>
        <SearchButton
          name={'Standard'}
          handleClick={handleDefault}
          type={searchType}
        />
        <SearchButton
          name={'Ingredients'}
          handleClick={handleDefault}
          type={searchType}
        />
        <SearchButton
          name={'Random'}
          handleClick={handleDefault}
          type={searchType}
        />
      </div>
      */}
    </>
  )
}

export default SearchBarForm
