import Header from './Header'
import RecipeList from './RecipeList'
import Pagination from './Pagination'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getRecipes, resetRecipes } from '../reducers/recipeReducer'

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  console.log(searchParams)

  const recipe = searchParams.get('recipeString')
  const page = searchParams.get('page')

  useEffect(() => {
    console.log('HOME USEEFFECT')
    if (!recipe && searchParams.size > 0) {
      navigate('/', { replace: true })
    }
    if (searchParams.size) {
      dispatch(getRecipes({ recipeString: recipe, page: page }))
    } else {
      dispatch(resetRecipes())
    }
  }, [searchParams.size, page, recipe])

  return (
    <div>
      <Header />
      <RecipeList />
      <Pagination />
    </div>
  )
}

export default Home
