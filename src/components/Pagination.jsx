import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { getPageArray } from '../utils/helper_functions'
//import { useDispatch } from 'react-redux'
//import { getRecipes } from '../reducers/recipeReducer'

const PageNumber = ({ page }) => {
  //const dispatch = useDispatch()

  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = searchParams.get('page') + 1
  //console.log(currentPage)
  //console.log(page)
  const pageBackground =
    Number(currentPage) === page ? 'bg-gray-200 font-medium text-gray-900' : ''

  const isButtonDisabled = page === '...' ? true : ''

  const handlePage = (event) => {
    event.preventDefault()
    const searchObject = {
      recipeString: searchParams.get('recipeString'),
      page: page,
    }
    console.log(searchObject)
    setSearchParams(searchObject)
    //dispatch(getRecipes(searchObject))
  }

  return (
    <button
      href='#'
      disabled={isButtonDisabled}
      onClick={handlePage}
      className={`rounded p-3 hover:bg-gray-100 ${pageBackground}`}
    >
      {page}
    </button>
  )
}

const Pagination = () => {
  const { recipes, loading } = useSelector(({ recipes }) => recipes)
  const [searchParams, setSearchParams] = useSearchParams()

  if (recipes.length === 0) {
    return null
  }

  const currentPage = Number(searchParams.get('page')) + 1
  const lastPage = Math.floor(recipes.totalResults / recipes.number) + 1
  //console.log(lastPage)
  const pageArray = getPageArray(currentPage, lastPage)
  //const pageArray = getPageArray(238, lastPage)
  //console.log(pageArray)

  const lastTripleDots =
    pageArray.includes(lastPage) && lastPage > 5 ? 'invisible' : ''

  const disableFirstArrow = searchParams.get('page') == 1 ? true : ''
  const disableLastArrow = searchParams.get('page') == lastPage ? true : ''

  //console.log(searchParams.get('page'))
  //console.log(disableFirstArrow)

  const nextPage = (event, next) => {
    event.preventDefault()
    //console.log(next)
    const searchObject = {
      recipeString: searchParams.get('recipeString'),
      page: Number(searchParams.get('page')) + next,
    }
    setSearchParams(searchObject)
  }

  //console.log(lastTripleDots)

  return (
    <div className='relative w-full py-2' role='group'>
      <nav
        aria-label='Pagination'
        className='flex items-center justify-evenly text-gray-600'
      >
        <button
          onClick={(event) => nextPage(event, -1)}
          disabled={disableFirstArrow}
          className='rounded p-3 hover:bg-gray-100'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M15 19l-7-7 7-7'
            />
          </svg>
        </button>
        {lastTripleDots && lastPage > 5 ? (
          <>
            <PageNumber page={1} /> <PageNumber page={'...'} />
          </>
        ) : (
          <></>
        )}
        {pageArray.map((number) => (
          <PageNumber key={number} page={number} />
        ))}
        {!lastTripleDots && lastPage > 5 ? (
          <>
            <PageNumber page={'...'} /> <PageNumber page={lastPage} />
          </>
        ) : (
          <></>
        )}
        <button
          onClick={(event) => nextPage(event, 1)}
          disabled={disableLastArrow}
          className='rounded p-3 hover:bg-gray-100'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M9 5l7 7-7 7'
            />
          </svg>
        </button>
      </nav>
    </div>
  )
}

export default Pagination
